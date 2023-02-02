# MatchMatcher
Basically a form to filter LoL matches based on players/champs.

Originally started to answer the query: _How many first turrets did "Slogdog White#EUW" kill?_

## Uses

This project may use the following:

- twisted
    * `npm:twisted`
    * https://github.com/Sansossio/twisted

- MongoDB

- Vega
    * https://vega.github.io/vega/examples/
    * Related, insp:
        + https://flourish.studio/examples/

- React
    * TanStack Query https://tanstack.com/query/latest/docs/react/quick-start


## How it works

- **Selection phase**
    * Query by participant's `summonerName`, `champion`, `role`.

- **Filter phase**
    * Filter by `sameTeam(a, b)` and `not(sameTeam(a, b))`
    * WIP: `sameTeam(summonerA, summonerB) = participant.summonerName == summonerA && participant.summonerName == summonerB && participantA.teamId == participantB.teamId`

- We call **Principal** the summoner/participant of interest to us (similar to the concept of Principal in Java Security).
- The principal S is the summoner "Slogdog White#EUW".
- Get all of S's matches and put them in a MongoDB collection `/matches`.
- For each match, extract the following values:
    * Outcome (Win/Loss/Remake?).
    * Principal's champion, role, and whether they got first turret blood (kill or assist).
    * Principal's opponent's champion.
        + Opponent = A participant whose role = principal.role but their teamId != principal.teamId.


## Design

### Form inputs

- Role: `{value, uniqueInTeam: true, uniqueInGame: false}`
- Champion: `{value, uniqueInTeam: true, uniqueInGame: true}`
- Player: `{value, uniqueInTeam: true, uniqueInGame: true}`


## Considerations

- Player IDs are not consistent across different API holders.
    * [Player Universally Unique IDentifiers and a New Security Layer | Riot Games](https://www.riotgames.com/en/DevRel/player-universally-unique-identifiers-and-a-new-security-layer)
    * [PUUIDs and Other IDs | Hextechdocs](https://hextechdocs.dev/puuids-and-other-ids/)
      #archived

---

END.
