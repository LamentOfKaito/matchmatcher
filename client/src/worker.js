/**
 * @file MatchMatcherWorker
 */

/**
 * @type {Array<LightMatch>}
 */
let normalizedMatches = null;

/**
 * @param {MatchSpec} spec
 * @returns {Array<number>} ids of matches to display
 */
function filterIds(spec) {
    if (!normalizedMatches) return [];
    
    const conformsToSpec = toRamdaQuery(spec);
    const ids = normalizedMatches.filter(conformsToSpec).map(m => m.id);
    return ids;
}

self.onmessage(e) {
    if (e.type === MessageTypes.Filter) {
        const matchSpec = e.matchSpec;
        const result = filterIds(matchSpec);
        self.post(result)
    } else if (e.type === MessageTypes.PutMatches) {
        const matches = e.matches;
        normalizedMatches = matches.map(normalizeMatch);
        self.post({result: 'OK'});
    } else {
        console.warn(`Unknown type '${e.type}'`, e);
    }
}
