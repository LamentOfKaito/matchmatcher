import * as R from 'ramda'
import { create } from 'zustand'

//@ts-ignore
import {lensParticipant} from './toRamdaQuery.ts';

export interface IMatchSpecState {
    enforceTeamIds: boolean,
    participants: Array<ParticipantSpec>
}

interface ParticipantSpec {
    idx: number,
    teamId: number,
    nickname: string,
    championName: string,
    roleName: string,

    nameDomain: string,
    nameValue: string,

    hasLolpros: boolean,
    hasFirstTower: boolean,
    items: number[],

}

function getInitState() {
    let participants = [];

    for (const prefix of ['Ally', 'Enemy']) {
        for (let i = 1; i <= 5; i++) {
            const obj = {
                idx: participants.length,
                nickname: `${prefix} ${i}`,

                teamId: prefix === 'Ally' ? 100 : 200,
                championName: '',
                roleName: '',

                nameDomain: 'Summoner name',
                nameValue: '',

                items: [],
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

const useSpecStore = create<IMatchSpecState>((set, get) => ({
    ...getInitState(),

    /**
     * 
     * @param {boolean} enforceTeamIds 
     * @returns 
     */
    setEnforceTeamIds: (enforceTeamIds) => set({enforceTeamIds}),

    /**
     * @param {string} championName
     */
    unsetChampion: (championName) => {
        const state = get();
        const i = state.participants.findIndex(p => p.championName === championName);
        if (i !== -1) {
            const updated = R.set(lensParticipant(i, 'championName'), '', state);
            set(updated);
        }
    },

    /**
     * @param {number} teamId
     * @param {string} roleName
     */
    unsetRole: (teamId, roleName) => {
        const state = get();
        const i = state.participants.findIndex(p => p.teamId === teamId && p.roleName === roleName);
        if (i !== -1) {
            const updated = R.set(lensParticipant(i, 'roleName'), roleName, state)
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
