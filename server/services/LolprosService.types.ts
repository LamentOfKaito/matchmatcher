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
    },
    _type: 'profile'
}

/**
 * @partial
 */
type LolprosSearchResult = Array<LolprosProfile>;
