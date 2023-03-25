# MatchMatcher

**MatchMatcher** is basically a customized query builder to filter LoL matches based on players, champions, etc.

Originally started to answer the query: _How many first turrets did "Slogdog White#EUW" kill?_

https://matchmacher.vercel.app


## How it works

The main "logic" parts are `MatchSpec`, `toMongoQuery`, and `toRamdaQuery`.

- **Data gathering phase**
    * We call **Principal** the summoner/participant of interest to us (similar to the concept of Principal in Java Security).
    * The principal S is the summoner "Slogdog White#EUW".
    * Get all of S's matches and put them in a MongoDB collection `lol-matches`.
    * For each match, extract the following values:
        + Outcome (Win/Loss/Remake?).
        + Principal's champion, role, and whether they got first tower takedown (kill or assist).
        + Principal's opponent's champion.
          (Opponent = A participant whose `role == principal.role` but their `teamId != principal.teamId`.)

- **Selection phase**
    * Query by participants' `summonerName`, `champion`, `role`.

- **Filter phase**
    * Filter by `sameTeam(a, b)` and `not(sameTeam(a, b))`

For more details, check [***docs/***](./docs/).

---

END.
