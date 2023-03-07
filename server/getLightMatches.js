import { LOL_MATCHES_COLL, mongoService } from './index.js';

export async function getLightMatches(region, summonerName) {
    const platformId = regionToPlatformId(region);
    const query = {
        'info.platformId': platformId,
        'info.participants': {
            $elemMatch: {
                'summonerName': summonerName,
            }
        }
    };

    const data = await mongoService.db
        .collection(LOL_MATCHES_COLL)
        .find(query)
        .map(makeLightMatch)
        .toArray();
    
    return data;
}

/**
 * @todo
 * 
 * @param {string} region 
 * @returns {string}
 */
function regionToPlatformId(region) {
    return {
        'euw': 'EUW1',
    }[region];
}

function makeLightMatch(match) {
    const {info} = match;
    const result = {
        id: info.gameId,
        winningTeamId: info.teams.find(t => t.win).teamId,
        participants: info.participants.map(p => {
            return {
                summonerName: p.summonerName,
                //championName: p.championName,
                championId: p.championId,
                teamId: p.teamId,

                // NOTE: `teamPosition` is the only useful prop, right?
                teamPosition: p.teamPosition,

                items: makeItemsArray(p),
                // first tower Takedown
                firstTower: p.firstTowerKill || p.firstTowerAssist,
            }
        }),
    }
    return result;
}

/**
 * @param {object} participant
 * @returns {Array<number>}
 */
function makeItemsArray(participant) {
    const LENGTH = 7;
    const arr = new Array(LENGTH);
    for (let i = 0; i < LENGTH; i++) {
        arr[i] = participant[`item${i}`]
    }
    return arr;
}
