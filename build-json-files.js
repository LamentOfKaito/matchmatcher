// shit
import { writeFile } from 'fs/promises';
import {getLightDdragon} from './server/getLightDdragon.js';
import {getLightMatches} from './server/getLightMatches.js';

const principal = {
    region: 'euw',
    summonerName: 'Slogdog White',
};

console.log('getLightMatches...');
const matches = await getLightMatches(principal.region, principal.summonerName);
console.log('Writing...');
await writeFile('./client/public/light-matches.json', JSON.stringify(matches));

console.log('getLightDdragon...');
const ddragon = await getLightDdragon();
console.log('Writing...');
await writeFile('./client/public/light-ddragon.json', JSON.stringify(ddragon));

console.log('Done.');
process.exit(0);
