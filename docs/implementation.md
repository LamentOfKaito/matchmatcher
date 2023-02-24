# Implementation

- Useful Mongodb features:
    * [**$function** (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/)
    * [**$addFields** (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/)
    * [**$getField (aggregation)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/getField/)

- https://mongoplayground.net
#interesting #mongodb

---

Axios
```js
/**
 * @returns Size of the resource in bytes (content-length).
 */
async function getSize(url) {
    return await axios
        .head(url)
        .then(res => res.headers['content-length'])
        .then(Number);
}

function prettyFilesize(bytes) {
    throw unimplemented exception
}

const lightDataUrl = './data.light.json';
document.onload = () => {
    size = await getSize(lightDataUrl)
    store.set(size)
} 

const sizeText = dataSize ? prettyFilesize(size) | 'unknown size';
<ButtonTimed timeout=5 action={fetchFile}>
    Load all data
    ({sizeText})
<ButtonTimed>
```

```js
const sUrl = 'https://jsonplaceholder.typicode.com/todos/'

await axios({
    url: sUrl,
    method: "GET",
    responseType: "blob", // important
    onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); // you can use this to show user percentage of file downloaded
        console.log({percentCompleted, progressEvent})
    }
})
```

```java
public class RiotService {
    public Iterator<Match> pullAllMatches(Summoner summoner) {
        return null;
    }

}
```

```js
function sameTeam(specA, specB) {
    const {participants} = this;
    
    identifyingProps(specA)
    identifyingProps(specB)
    if either of these is empty, return true; // assumption

    participants.find()
    participants.find()
    return playerA.teamId === playerB.teamId
}

function identifyingProps(spec) {
    const UNIQUE_PROPS = [
        // not 'role'
        'championName',
        'summonerName'
    ]

    return spec.keys.in UNIQUE_PROPS and not null
    
}
```
