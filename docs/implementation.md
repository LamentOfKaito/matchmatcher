# Implementation


## Uses

This project may use the following:

- ~~twisted~~
    * `npm:twisted`
    * https://github.com/Sansossio/twisted

- [x] MongoDB

- [x] React
    * [ ] TanStack Query https://tanstack.com/query/latest/docs/react/quick-start

- [ ] Vega
    * https://vega.github.io/vega/examples/
    * Related, insp:
        + https://flourish.studio/examples/

---

- Useful Mongodb features:
    * [**$elemMatch** (query)](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/)
    * [**$function** (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/)
    * [**$addFields** (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/)
    * [**$getField** (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/getField/)


- https://mongoplayground.net
#interesting #mongodb

- https://github.com/crcn/sift.js
"Use Mongodb queries in JavaScript"
#interesting

- https://www.npmjs.com/package/bottleneck
#interesting


## Data organization

There are 3 data stores:
- **MatchSpec**
- **LightMatches**
- **LightDdragon**


## About the progress indicator

- When using `serve` (npm package) and CRA (`npm start`), the Content-Length header is absent.
`http-server` works fine.
Vercel should work fine.

---

END.
