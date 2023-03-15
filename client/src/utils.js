/**
 * External link to a match.
 * 
 * Options:
 * - https://www.leagueofgraphs.com/match/:matchRegion/:matchId
 * - https://app.mobalytics.gg/lol/match/:matchRegion/:summonerName/:matchId
 *
 * @example
 * linkToMatch('euw', 6261181408) === 'https://www.leagueofgraphs.com/match/euw/6261181408'
 *
 * @param {string} matchRegion - for example 'euw' or 'na'
 * @param {number} matchId
 * @returns {string} LeagueOfGraphs URL
 */
export function linkToMatch(matchRegion, matchId) {
    return `https://www.leagueofgraphs.com/match/${matchRegion}/${matchId}`;
}


/**
 * @example
 * normalizeSummonerName('Ekko the Neeko') ===
 * normalizeSummonerName('EkkoTheNeeko')   ===
 *                       'EKKOTHENEEKO';
 *
 * @param {string} summonerName
 * @returns {string}
 */
export function normalizeSummonerName(summonerName) {
    return summonerName.toUpperCase().replace(/\s/g, '');
}


/**
 * @param {LightMatch} match
 */
export function normalizeMatch(match) {
    return {
        ...match,
        participants: match.participants.map(p => ({
            ...p,
            summonerName: normalizeSummonerName(p.summonerName),
            })),
    }
}


/**
 * @param {RiotMatch} match
 * @returns {boolean}
 */
export function isRemake(match) {
    throw new Error('Unimplemented Exception');
}
