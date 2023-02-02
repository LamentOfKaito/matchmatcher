interface MatchesDto
{
    format: "StandaloneLight",
    version: 0,
    createdAt: string,
    matches:
        {
            id: string,
            region: string,
            winner: number, // teamId
            firstTurretTakedown: string[], // summonerNames (kill then any assists)
            participants:
                {            
                    championName: string,
                    role: string, // top, jungle, middle, bottom, support
                    summonerName: string,
                    lolpro: string, // Lolpros slug
                }[],
        }[]
}
