/** 
 * `GET /light-data/{champions,items}`
 * Return latest data.
 */

export interface LightDdragonData {
    version: string,
    champions: Array<LightChampion>,
    items: Array<LightItem>,
}

interface LightChampion {
    id: number,
    slug: string,
    name: string,

    // Use sprite?
    // image: string,
}

interface LightItem {
    id: number,
    name: string,
    
    // Use sprite?
    // image: string,
}

interface LightMatchesData {
    format: "StandaloneLight",
    version: 0,
    createdAt?: string,
    matches: {
        id: string,
        region: string,
        winningTeamId: number,
        participants:
            {            
                summonerName: string,
                lolpro: string, // Lolpros slug
                championId: string,
                role: string, // teamPosition
            }[],
    }[]
}
