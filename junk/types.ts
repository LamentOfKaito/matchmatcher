/** 
 * `GET /light-data/{champions,items}`
 * Return latest data.
 */

interface LightData {
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
