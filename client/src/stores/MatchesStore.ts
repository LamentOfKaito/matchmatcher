import { create } from 'zustand'

export interface MatchesStore {
    status: 'LOADING' | 'LOADED',
    metadata: {
        size?: number
    },
    data: {
        lastUpdated
        matches
    }
}

const useSpecStore = create((set, get) => ({
    status: 'LOADING',
    matches: [],

    setStatus: (status) => set({status}),
    setMatches: (matches) => set({matches})
}));

export default useSpecStore;
