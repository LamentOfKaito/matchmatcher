import * as R from 'ramda'
import { create } from 'zustand'

import { NAME_DOMAINS } from './common.ts';

import {lensParticipant} from './toRamdaQuery.ts';

export interface IMatchSpec {
    enforceTeamIds: boolean,
    participants: Array<ParticipantSpec>,
}

interface ParticipantSpec {
    idx: number,
    nickname: string,
    teamId: number,
    championId: string,
    role: string,
    items: number[],

    nameDomain: string,
    nameValue: string,

    hasLolpros: boolean,
    hasFirstTower: boolean,

}


/**
 * 
 * @remark
 * - About `xSelected: []` attributes:
 * BaseWeb requires that Select values are arrays even if we can only select one item at a time.
 * 
 * @returns {IMatchSpec}
 */
function getInitState() {
    const participants: ParticipantSpec[] = [];

    for (const prefix of ['Ally', 'Enemy']) {
        for (let i = 1; i <= 5; i++) {
            const obj = {
                idx: participants.length,
                nickname: `${prefix} ${i}`,

                teamId: prefix === 'Ally' ? 100 : 200,

                championId: -1,
                championSelected: [],
                
                role: '',
                roleSelected: [],

                nameValue: '',
                nameDomain: NAME_DOMAINS[0],
                nameDomainSelected: [ NAME_DOMAINS[0] ],

                items: [],
                itemsSelected: [],

                hasLolpros: false,
                hasFirstTower: false,
            }
            participants.push(obj);
        }
    }

    return {
        enforceTeamIds: false,
        participants,
    }

}

const useSpecStore = create<IMatchSpec>((set, get) => ({
    ...getInitState(),

    /**
     * @param {boolean} enforceTeamIds 
     */
    setEnforceTeamIds: (enforceTeamIds) => set({enforceTeamIds}),

    /**
     * @param {number} championId
     */
    unsetChampion: (championId) => {
        const state = get();
        const i = state.participants.findIndex(p => p.championId === championId);
        if (i !== -1) {
            const updated = R.set(lensParticipant(i, 'championId'), -1, state);
            //R.set(lensParticipant(i, 'championSelected'), [], state);
            set(updated);
        }
    },

    /**
     * @param {number} teamId
     * @param {string} role
     */
    unsetRole: (teamId, role) => {
        const state = get();
        const i = state.participants.findIndex(p => p.teamId === teamId && p.role === role);
        if (i !== -1) {
            const updated = R.set(lensParticipant(i, 'role'), role, state);
            //R.set(lensParticipant(i, 'roleSelected'), [], state);
            set(updated);
        }
    },

    /**
     * 
     * @param {string} propName 
     * @param {number} pIndex 
     * @param {any} val 
     */
    setProp: (propName, pIndex, val) => {
        const state = get();
        const updated = R.set(lensParticipant(pIndex, propName), val, state);
        set(updated);
    }
}));

export default useSpecStore;
