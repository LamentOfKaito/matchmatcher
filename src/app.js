const express = require('express')
const app = express()
const port = 3000

/*
GET /matches
    getAllMatches

GET /summoners/:region/:name
    getMatchesBySummoner

POST /summoners/:region/:name/update
    refreshSummoner
    returns Job


/jobs/:id
*/



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
