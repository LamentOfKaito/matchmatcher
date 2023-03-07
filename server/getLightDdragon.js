/**
 * Fetch the names and ids of champions and items.
 * 
 * @todo Move to RiotService?
 * @todo Remove either `slug` or `name` from `LightChampion`?
 */
export async function getLightDdragon() {
    const [versions] = await kaiFetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const latestVersion = versions[0];
    const [minimalChampions] = await kaiFetch(`http://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`);
    const [minimalItems] = await kaiFetch(`http://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`);
    
    const lightChampions = Object
        .entries(minimalChampions.data)
        .map(([k, champ]) => {
            console.log({k})
            return {
                id: Number(champ.key),
                slug: champ.id,
                name: champ.name,
            }
        });
    const lightItems = Object
        .entries(minimalItems.data)
        .map(([k, item]) => {
            return {
                id: Number(k),
                name: item.name,
            }
        });

    return {
        format: 'LightDdragon',
        version: latestVersion,
        items: lightItems,
        champions: lightChampions,
    }
}

/**
 * @param {RequestInfo | URL} input
 * @param {RequestInit} [options]
 * @returns {Promise<[any, Response]>}
 */
async function kaiFetch(input, options, contentType = 'json') {
    const res = await fetch(input, options);
    if (res.ok) {
        const data = await res[contentType]();
        return [data, res]
    } else {
        throw res;
    }
}
