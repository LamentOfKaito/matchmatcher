# TODO

- [ ] Add eslint for AirBnB style

- [ ] Write unit tests

- [ ] Use web worker

- [ ] Add time ago
    May use:
    * https://github.com/date-fns/date-fns
    * https://github.com/thebuilder/react-intersection-observer


## Correct logic?

```js
// Server

curs = coll.query(toMongoQuery(spec))

const verifyTeams = enforceTeamIds ? always(true) :
createVerifyTeams;

curs.filter(verifyTeams).map(getLightMatch).toArray()
```

- [ ] LEARN: Mongodb `field.equalsIgnoreCase(val)`
    * Possible solution: https://stackoverflow.com/a/40914924

---

END.
