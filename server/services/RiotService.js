import { RiotAPI, RiotAPITypes, PlatformId } from '@fightmegg/riot-api'

export default class RiotService {
    
    constructor({riotApi}) {
        this.rAPI = new RiotAPI(riotApi);
    }
    
    async getAllRankedMatchIds(region, summonerName) {
        const summoner = await this.rAPI.summoner.getBySummonerName({
            region: PlatformId.EUW1,
            summonerName: summonerName,
        });
        
        const MAX_COUNT = 100;
        let i = 0;
        let done = false;
        let allMatchIds = [];
        let fetchedMatchIds = [];
        
        do {
            fetchedMatchIds = await this.rAPI.matchV5.getIdsbyPuuid({
                cluster: 'europe',
                puuid: summoner.puuid,
                params: {
                    type: RiotAPITypes.MatchV5.MatchType.Ranked,
                    count: MAX_COUNT,
                    start: i,
                }
            });
            allMatchIds = [...allMatchIds, ...fetchedMatchIds];
            done = fetchedMatchIds.length === 0;
            i = i + MAX_COUNT;
        } while(!done);
        
        allMatchIds = Array.from(new Set(allMatchIds))
        
        return allMatchIds;
    }


    async getMatch(matchId) {
        const match = await this.rAPI.matchV5.getMatchById({
            cluster: 'europe',
            matchId: matchId,
        });
        return match;
    }

}
