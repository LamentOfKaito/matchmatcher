import {equals, whereEq} from 'ramda'
const R = {equals, whereEq}

/**
 * Given two specs, return whether the two participants described by specs A and B are on the same team.
 * 
 * @param {object} specA 
 * @param {object} specB 
 * @param {object} match 
 * @returns {boolean}
 */
function sameTeamBySpec(specA, specB, match) {
    const {participants} = match;
    
    const xA = identifyingProps(specA);
    const xB = identifyingProps(specB);
    // if either of these is empty, assume they are equal.
    if (R.equals({}, xA) || R.equals({}, xB)) {
        return true;
    }

    const playerA = participants.find(R.whereEq(xA));
    const playerB = participants.find(R.whereEq(xB));
    // If we couldn't find a participant by spec, what does it mean?
    // Do we assume they are on the same team or not?
    // What if we search by lolpros, but they just don't have it set for some reason?
    if (!playerA || !playerB) {
        return false;
    }

    return playerA.teamId === playerB.teamId;
}

/**
 * Get only identifying props.
 * To be used with `R.whereEq`.
 * 
 * @param {object} spec Participant spec
 * @returns {object}
 */
function identifyingProps(spec) {
    const UNIQUE_PROPS = [
        // not 'role'
        'championName',
        'summonerName',
        'lolpros',
    ];

    const obj = {};

    for (const propName of UNIQUE_PROPS) {
        if (spec[propName]) {
            obj[propName] = spec[propName];
        }
    }
 
    return obj;
}
