import RiotService from './services/RiotService.js'
import MongoService, {DEFAULT_LOCAL_URI} from './services/MongoService.js'
import LolprosService from './services/LolprosService.js';
import * as dotenv from 'dotenv'

export const LOL_MATCHES_COLL      = 'lol_matches';
export const LOLPROS_PROFILES_COLL = 'lolpros_profiles';
export const LOLPROS_SEARCHES_COLL = 'lolpros_searches';

dotenv.config();
const riotApi    = process.env.MATCHMATCHER_RIOT_API;
const mongodbUri = process.env.MATCHMATCHER_MONGODB_URI || DEFAULT_LOCAL_URI;

export const riotService = new RiotService({riotApi});
export const mongoService = new MongoService({uri: mongodbUri});
export const lolprosService = new LolprosService();

const principal = {
    region: 'euw',
    summonerName: 'Slogdog White',
};

async function refreshMatches(){

    const matchIds = await riotService.getAllRankedMatchIds(principal.region, principal.summonerName);

    console.log(`Total matchIds.length: ${matchIds.length}`);

    for (const matchId of matchIds) {
        const exists = await mongoService.existsById(LOL_MATCHES_COLL, matchId);
        console.log({matchId, exists});
        if (exists) {
            continue;
        } else {
            const match = await riotService.getMatch(matchId);
            await mongoService.insert(LOL_MATCHES_COLL, match);    
        }
    }
    
}

async function count() {
    const query = {
        'info.participants': {
            $elemMatch: {
                summonerName: principal.summonerName,
                // first tower takedown (kill or assist)
                $or: [
                    {firstTowerKill: true},
                    {firstTowerAssist: true},
                ]
            }
        }
    };
    const projection = {
        _id: 0,
        'info.gameId': 1,
        'info.participants': {
            summonerName: 1,
            championName: 1,
            firstTowerKill: 1,
            firstTowerAssist: 1,
            win: 1,
        }
    };
    
    const firstTurretMatches = await mongoService.db
        .collection(LOL_MATCHES_COLL)
        .find(query, {projection}).toArray();

    const total = 350; // hardcoded
    const firstTurretsCount = firstTurretMatches.length;
    const firstTurretsWinCount = firstTurretMatches
        .filter(m => m.info.participants.some(p => p.summonerName === principal.summonerName && p.win))
        .length;
    
    console.log({total, firstTurretsCount, firstTurretsWinCount});
}

async function getUniqueSummonerNames() {
    const query = {
        'info.participants': {
            $elemMatch: {
                summonerName: principal.summonerName,
            }
        }
    };
    const projection = {
        _id: 0,
        'info.participants.summonerName': 1,
    };

    const uniqueSummonerNames = new Set();
    
    await mongoService.db
        .collection(LOL_MATCHES_COLL)
        .find(query, {projection})
        .forEach(m => {
            m
                .info
                .participants
                .map(p => p.summonerName)
                .forEach(pName => uniqueSummonerNames.add(pName));
        });
    
    console.log(`There are ${uniqueSummonerNames.size} uniqueSummonerNames`);
    
    return uniqueSummonerNames;
}

async function fetchLolpros() {
    const uniqueSummonerNames = await getUniqueSummonerNames();
    /**
     * Map.
     * @type {{[key: string]: string}}
     */
    const summonerNameLolprosMap = {};
    
    let slug = null;
    for (const summonerName of uniqueSummonerNames) {
        if (await mongoService.existsAny(LOLPROS_SEARCHES_COLL, {summonerName})) {
            console.log(`Reading cached data for '${summonerName}'...`);
            const doc = await mongoService.db.collection(LOLPROS_SEARCHES_COLL).findOne({summonerName});
            slug = LolprosService.extractSlugFor(principal.region, summonerName, doc.result);
        } else {
            console.log(`Searching for '${summonerName}'...`);
            const result = await lolprosService.search(summonerName);
            const doc = {
                summonerName,
                timestamp: Date.now(),
                result,
            };
            await mongoService.db.collection(LOLPROS_SEARCHES_COLL).insertOne(doc);
            slug = LolprosService.extractSlugFor(principal.region, summonerName, result);
        }

        mongoService.insert(LOLPROS_PROFILES_COLL, {summonerName, slug});
        summonerNameLolprosMap[summonerName] = slug;
    }
}
