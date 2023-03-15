import { create } from 'zustand'

export interface MatchesStore {
    status: 'LOADING' | 'LOADED',
    metadata?: {
        size?: number
    },
    matches: Array<object>
}

const useMatchesStore = create<MatchesStore>((set, get) => ({
    status: 'LOADING',
    matches: [],

    setStatus: (status) => set({status}),
    setMatches: (matches) => set({matches})
}));

export default useMatchesStore;
