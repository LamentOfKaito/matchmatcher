# MatchMacher API endpoints

## Riot LoL Matches 
- `/matches`

---

## Lolpros Profiles
- `/lolpros`
- `/lolpros/by-slug/{slug}`
- `/lolpros/by-summoner/{region}/{name}`

```js
async function getProBySummonerName(region, name)
    foundProfile = query {accounts: {name, region}}
        return profile

    searchLolpros
    getLolprosProfile
    saveProfile
    return profile
    
    return null;
```

Lolpros_search
    timestamp
    result
    query

---

## Twitch streamers
- `streamers/`

```
getStreamers()
    fetch streamers by game: lol
    for each streamer, check if there is a chat participant called streamelements or nightbot
    send a command !opgg
    parse the opgg links
    save {streamer, accounts}
```

---

END.
