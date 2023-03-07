import express from 'express'
import { getLightDdragon } from './getLightDdragon.js';
import { getLightMatches } from './getLightMatches.js';

const app = express();
const port = 3000;

app.get('/light-data', async (req, res) => {
    const result = await getLightDdragon();
    res.send(result);
});

app.get('/light-matches/:region/:summonerName', async (req, res) => {
    const {region, summonerName} = req.params;
    const result = await getLightMatches(region, summonerName);
    res.send(result);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
