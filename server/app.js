import express from 'express'
import cors from 'cors'

import { getLightDdragon } from './getLightDdragon.js';
import { getLightMatches } from './getLightMatches.js';

const app = express();
app.use(cors());
const port = 3000;

let lightData = null;
app.get('/light-data', async (req, res) => {
    if (!lightData) {
        lightData = await getLightDdragon();
    }
    res.send(lightData);
});

app.get('/light-matches/:region/:summonerName', async (req, res) => {
    const {region, summonerName} = req.params;
    const result = await getLightMatches(region, summonerName);
    res.send(result);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
