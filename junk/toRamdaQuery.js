/**
 * @see https://github.com/ramda/ramda/issues/1914 
 */
const isSubset = R.curry((subset, set) => R.equals(R.intersection(subset, set), subset));


function lensParticipant(pIndex, ...restPath) {
  return R.lensPath(['participants', pIndex, ...restPath])
}


/**
 * @param {object} Participant.
 * @returns {Array<number>}
 */
function getItemsArray(participant) {
    const LENGTH = 7;
    const arr = new Array(LENGTH);
    for (let i = 0; i < LENGTH; i++) {
        arr[i] = participant[`item${i}`]
    }
    return arr;
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
