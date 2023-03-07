/**
 * @see https://github.com/ramda/ramda/issues/1914 
 */
const isSubset = R.curry((subset, set) => R.equals(R.intersection(subset, set), subset));


function lensParticipant(pIndex, ...restPath) {
  return R.lensPath(['participants', pIndex, ...restPath])
}


/**
 * @returns {function} a Ramda `where` function
 */
function kaiToRamdaSpec(kaiSpec) {
    const k = kaiSpec;

    return R.where({
        summonerName: equal(k.summonerName),
        items: isSubset(k.items)
    });
}
