/**
 * @partial
 */
interface LolprosProfile {
    slug: string,
    name: string,
    league_player: {
        accounts: {
            server: string, // e.g. "EUW"
            summoner_name: string,
        }[]
    }
}

/**
 * @partial
 */
type LolprosSearchResult = Array<LolprosProfile>;

export default class Lolpros {

    /**
     * Map
     * @type {[string]:string}
     */
    serverSummonerCache: {};

    /**
     * @type {LolprosSearchResult}
     */
    searchCache: {};
    
    /**
     * Failed search queries
     * @type {string[]}
     */
    deadletterQueue: [];

    // ---
    
    /**
     * @todo Use Mongo or Redis.
     *
     * @returns {Promise<LolprosSearchResult>}
     */
    async fetchSearch(query) {
        if (Object.hasOwn(this.searchCache, query)) {
            return this.searchCache[query];
        } else {
            try {
                const url = `https://api.lolpros.gg/es/search?query=${query}&active=true`;
                const results = await fetch(url).then(res => res.json());
                this.searchCache[query] = results;
                return results;
            } catch (e) {
                this.deadletterQueue.push(query);
                this.searchCache[query] = null;
                return null;
            }
        }
    }
    
    /**
     * @returns {Promise<LolprosProfile>}
     */
    async fetchProfile(slug) {
        const url = `https://api.lolpros.gg/es/profiles/${slug}`;
        const res = await fetch(url).then(res => res.json());
        return res;
    }
    
    async getBySummonerName(summonerName, region) {
        const cacheKey = `${summonerName}#${region}`
        if (Object.hasOwn(this.serverSummonerCache, cacheKey)) {
            return this.serverSummonerCache[cacheKey];
        } else {
            const results = await this.fetchSearch(summonerName);
            const profile = results.find(entry =>
                entry.league_player.accounts.contains(a.summoner_name === summonerName && a => a.server === region)
            );
        }

        if (profile) {
            this.serverSummonerCache[cacheKey] = profile.slug;
            return profile.slug;
        } else {
            return null;
        }
        
    }
    
}
