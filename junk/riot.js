import { LolApi, Constants } from 'twisted'

export default class Matches {

    constructor({riotApiKey, mongoCollection}) {
        this.twistedLol = new LolApi(riotApiKey);
        this.mongoCollection = null;
    }
    
    /**
     * Get all games of a specific summoner
     */
    async getBySummonerName(summonerName, region) {
        const summoner = await twistedLol.Summoner.getByName('Slogdog White', Constants.Regions.EU_WEST);
        const matchIds = await twistedLol.MatchV5.list(summ.uuid, Constants.RegionGroups.EUROPE);
        const matches = [];
        for (matchId of matchIds) {
            const match = await twistedLol.MatchV5.get(matchId);
            matches.push(match);
        }
        return matches;
    }

}
