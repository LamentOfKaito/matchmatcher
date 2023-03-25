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

/**
 * Get the size of a resource.
 *
 * @todo Maybe rename to `getContentLength`.
 *      + `getContentLength` is more descriptive.
 *      + `getSize` is more consistent with `getPrettySize`.
 *
 * @example
 * // What's the size of "Alice in Blunderland: an Iridescent Dream" (.M4B)?
 * // https://librivox.org/alice-in-blunderland-an-iridescent-dream-by-john-kendrick-bangs/
 * const url = 'https://archive.org/download/alice_in_blunderland_rg_librivox/AliceInBlunderland_librivox.m4b';
 * const size = await getSize(url);
 *
 * @implNote: `options` will be passed directly to `fetch`.
 *
 * @param {string} url
 * @param {import('node-fetch').RequestInit} options
 * @returns {Promise<number>} Size in bytes (content-length).
 */
export async function getSize(url, options = {}) {
    return await fetch(url, {...options, method: 'HEAD'})
        .then(res => res.headers.get('content-length'))
        .then(Number);
}

/**
 * @param {number} bytes 
 * @returns {string}
 */
export function prettyFilesize(bytes) {
    return `${bytes} bytes`;
    // throw new Error('Unimplemented exception');
}
