// Lifted/centalized state
export interface MatchSpecData {
    enforceTeamIds: boolean,
    participants: Array<{
        teamId: number,
        championName: string,
        role: string,
        nameDomain: string,
        nameValue: string,
        
        firstBlood: boolean,
        firstTurret: boolean,
        items: number[],
    }>
}

const useMatchSpecStore = () => {};

export default useMatchSpecStore;
