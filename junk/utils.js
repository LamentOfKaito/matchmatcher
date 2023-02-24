/**
 * Link to a match.
 * 
 * Options:
 * - https://www.leagueofgraphs.com/match/:matchRegion/:matchId
 * - https://app.mobalytics.gg/lol/match/:matchRegion/:summonerName/:matchId
 *
 * @returns {String} LeagueOfGraphs URL
 */
export function linkToMatch(matchRegion, matchId) {
    // eg. "https://www.leagueofgraphs.com/match/euw/6261181408"
    return `https://www.leagueofgraphs.com/match/${matchRegion}/${matchId}`;
}
