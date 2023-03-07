export default class LolprosService {

    constructor() {
        /**
         * Map
         * @type {{[key: string]: string}}
         */
        this.serverSummonerCache = {};

        /**
         * @type {{[key: string]: LolprosSearchResult}}
         */
        this.searchCache = {};
        
        /**
         * Failed search queries
         * @type {string[]}
         */
        this.deadletterQueue = [];
    }

    // ---
    
    async search(query) {
        return this.fetchSearch(query);
    }

    /**
     * @param {string} query
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
     * @param {string} slug
     * @returns {Promise<LolprosProfile>}
     */
    async fetchProfile(slug) {
        const url = `https://api.lolpros.gg/es/profiles/${slug}`;
        const res = await fetch(url).then(res => res.json());
        return res;
    }
    
    /**
     * 
     * @param {string} region 
     * @param {string} summonerName 
     * @returns {Promise<string>}
     */
    async getBySummonerName(region, summonerName) {
        const cacheKey = `${summonerName}#${region}`
        if (Object.hasOwn(this.serverSummonerCache, cacheKey)) {
            return this.serverSummonerCache[cacheKey];
        } else {
            const results = await this.fetchSearch(summonerName);
            const slug = LolprosService.extractSlugFor(region, summonerName, results);

            if (slug) {
                this.serverSummonerCache[cacheKey] = slug;
            }
            return slug;
        }
    }
    
    /**
     * 
     * @param {string} region 
     * @param {string} summonerName 
     * @param {LolprosSearchResult} searchResults
     */
    static extractSlugFor(region, summonerName, searchResults) {
        if (!searchResults) return null;
        const acc = searchResults
            .find(entry =>
                entry.league_player?.accounts.some(a => a.summoner_name === summonerName && a.server === region.toUpperCase())
        );

        if (acc) {
            return acc.slug;
        } else {
            return null;
        }
    }

}
