
export default interface MatchStore {
    status: 'LOADING' | 'LOADED',
    metadata: {
        size?: number
    },
    data: {
        lastUpdated
        matches
    }
}
