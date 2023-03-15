# MatchMatcher
Basically a customized query builder to filter LoL matches based on players, champions, etc.

Originally started to answer the query: _How many first turrets did "Slogdog White#EUW" kill?_


## Uses

> See [`implementation.md`](./docs/implementation.md).

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


## How it works

The main "logic" parts are `MatchSpec`, `toMongoQuery`, and `toRamdaQuery`.

- **Selection phase**
    * Query by participant's `summonerName`, `champion`, `role`.

- **Filter phase**
    * Filter by `sameTeam(a, b)` and `not(sameTeam(a, b))`

- We call **Principal** the summoner/participant of interest to us (similar to the concept of Principal in Java Security).
- The principal S is the summoner "Slogdog White#EUW".
- Get all of S's matches and put them in a MongoDB collection `/matches`.
- For each match, extract the following values:
    * Outcome (Win/Loss/Remake?).
    * Principal's champion, role, and whether they got first turret blood (kill or assist).
    * Principal's opponent's champion.
        + Opponent = A participant whose `role == principal.role` but their `teamId != principal.teamId`.


For more details, check [***docs/***](./docs/).

---

END.
