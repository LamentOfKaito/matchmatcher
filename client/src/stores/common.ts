export const NAME_DOMAINS = [
    { id: 'SUMMONER_NAME', label: 'Summoner name' },
    { id: 'LOLPROS', label: 'Lolpros' },
];

export const ROLE_OPTIONS = [
    {label: 'Any', id: '*'},
    {label: 'Top', id: 'TOP'},
    {label: 'Jungle', id: 'JUNGLE'},
    {label: 'Middle', id: 'MIDDLE'},
    {label: 'Bottom', id: 'BOTTOM'},
    {label: 'Support', id: 'UTILITY'}   
];

/**
 * Sorted.
 */
export const TEAM_POSITIONS = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];

export const TEAM_IDS = [100, 200];
export const TEAM_COLORS = ['blue', 'red'];
/**
 * @param {number} teamId 
 * @returns {string}
 */
export function toTeamColor(teamId) {
  return TEAM_COLORS[TEAM_IDS.indexOf(teamId)];
}
