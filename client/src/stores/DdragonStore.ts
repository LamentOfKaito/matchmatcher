import { create } from 'zustand'

import LightDdragonData from './types.ts'

/**
 * @namespace Ddragon
 */

const CDN_BASE = 'http://ddragon.leagueoflegends.com/cdn';

// Hardcoded, I know, but it's for testing.
const LATEST_KNOWN_VERSION = '13.4.1';

/**
 * Link to square image of a champion.
 * 
 * @param {{id: number, slug: string, version: string}} props `id` or `slug` are required
 * @returns {string} URL
 */
export function championSquareImg({id, slug, version = LATEST_KNOWN_VERSION}) {
    if (id) {
        slug = useDdragonStore.getState().champions.find(c => c.id === id)?.slug;
    }

    return `${CDN_BASE}/${version}/img/champion/${slug}.png`;
}

const useDdragonStore = create<LightDdragonData>((set, get) => ({
    version: LATEST_KNOWN_VERSION,
    champions: [],
    items: [],

    setData: (data) => set(data),
}));

export default useDdragonStore;
