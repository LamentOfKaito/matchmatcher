# Implementation

- Useful Mongodb features:
    * [**$function** (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/)
    * [**$addFields** (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/)
    * [**$getField (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/getField/)

- https://mongoplayground.net
#interesting #mongodb

- https://github.com/crcn/sift.js
"Use Mongodb queries in JavaScript"
#interesting


## Data organization
There are 3 data stores:
- **MatchSpec**
- **LightMatches**
- **LightDataDragon**
```ts
interface ILightData {

    champions: {
        name: string,
        id: number,
    }[],

    items: {
        name: string,
        id: number,
    }[]

}
```

---

END.
