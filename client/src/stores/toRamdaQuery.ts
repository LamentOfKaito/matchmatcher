import * as R from 'ramda'
import { normalizeSummonerName } from '../utils.js';
import { createVerifyTeams } from './createVerifyTeams.js';
import { IMatchSpec } from './MatchSpecStore.ts';

/**
 * @see https://github.com/ramda/ramda/issues/1914 
 */
const isSubset = R.curry((subset, set) => R.equals(R.intersection(subset, set), subset));

/**
 * @enum
 */
const NameDomainsEnum = {
    summonerName: 'summonerName',
    lolpros: 'lolpros',
}

/**
 * Given a list of predicates, return `true` if
 * each predicate matches at least one element.
 *
 * @example
 * const test = allAnyPass([equals(1), flip(gt)(10)]);
 * test([1, 25]) === true;
 * test([0, 25]) === false;
 *
 * @param {Array<function>} predicates
 * @param {Array<any>} elements
 */
const allAnyPass = R.curry((predicates, elements) => predicates.every(p => elements.some(p)));

/**
 * Create R.lens for a participant
 *
 * @example
 * lensParticipant(1);
 * lensParticipant(1, 'summonerName');
 *
 * @param {number} pIndex participant index
 */
export function lensParticipant(pIndex, ...restPath) {
  return R.lensPath(['participants', pIndex, ...restPath])
}

/**
 * @example
 * matches.filter(toRamdaQuery(matchSpec));
 *
 * @param {IMatchSpec} matchSpec
 * @returns {function} a filter funcion (Ramda `where`)
 */
export function toRamdaQuery(matchSpec) {
  
    const participantPreds = matchSpec.participants.map(pSpec => {
        const o: any = {};

        if (pSpec.nameValue) {
            if (pSpec.nameDomain === NameDomainsEnum.lolpros) {
                o.lolpros = R.equals(pSpec.nameValue);
            } else if (pSpec.nameDomain === NameDomainsEnum.summonerName) {
                o.summonerName = R.equals(normalizeSummonerName(pSpec.nameValue));
            } else {
                // Nothing
            }
        }
        
        if (matchSpec.enforceTeamIds) {
            o.teamId = R.equals(pSpec.teamId);
        }
        
        return R.where({
            ...o,
            items: isSubset(pSpec.items),
        });
    });
    
    const verifyTeams = matchSpec.enforceTeamIds ? R.always(true) : createVerifyTeams(matchSpec);

    return R.both(
        R.where({participants: allAnyPass(participantPreds)}),
        verifyTeams
        );
}

/**
 * - Convert `xSelected` to `x`
 * 
 * @param {IMatchSpec} matchSpec
 * @returns {IMatchSpec}
 */
export function tidyMatchSpec(matchSpec) {

    return {
        ...matchSpec,
        participants: matchSpec.participants.map(p => {
            return {
                ...p,
                items: p.itemsSelected.map(R.prop('id')),
                role: p.roleSelected.map(R.prop('id'))[0] || '',
                championId: p.championSelected.map(R.prop('id'))[0] || 0,
                nameDomain: p.nameDomainSelected.map(R.prop('id'))[0],
            }
        }),
    }

}
