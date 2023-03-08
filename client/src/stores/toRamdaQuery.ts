import * as R from 'ramda'

/**
 * @see https://github.com/ramda/ramda/issues/1914 
 */
const isSubset = R.curry((subset, set) => R.equals(R.intersection(subset, set), subset));


export function lensParticipant(pIndex, ...restPath) {
  return R.lensPath(['participants', pIndex, ...restPath])
}


/**
 * @returns {function} a Ramda `where` function
 */
export function kaiToRamdaSpec(kaiSpec) {
    const k = kaiSpec;

    return R.where({
        summonerName: R.equals(k.summonerName),
        items: isSubset(k.items)
    });
}
