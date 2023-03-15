import * as R from 'ramda'

const not = R.complement;

const j = (x) => JSON.stringify(x);

Function.prototype.kaiJ = function(data) {
    this.toJSON = () => data;
    this.toString = this.toJSON;

    return this;
}

/**
 * Creates a function that verifies that participants
 * are on the same team (allies) or on different teams (enemies).
 *
 * @param {MatchSpec} matchSpec
 * @returns {Function} a function `verifyTeams(match: LightMatch): boolean`
 */
export function createVerifyTeams(matchSpec) {
    const [allies, enemies] = R.splitEvery(5, matchSpec.participants);

    const alliesSpecs = allies.map(identifyingParticipantSpec).filter(not(R.isEmpty));
    const alliesHead = R.slice(0, 1, alliesSpecs);
    const alliesRest = R.slice(1, Infinity, alliesSpecs);

    const enemiesSpecs = enemies.map(identifyingParticipantSpec).filter(not(R.isEmpty));
    const enemiesHead = R.slice(0, 1, enemiesSpecs);
    const enemiesRest = R.slice(1, Infinity, enemiesSpecs);
    
    const predicates = [
        R.xprod(alliesHead, enemiesHead)
            .map(([a, b]) => not(sameTeamBySpec(a, b))
                .kaiJ(`not(sameTeamBySpec(${j(a)}, ${j(b)}))`)
            ),
        R.xprod(alliesHead, alliesRest)
            .map(([a, b]) => sameTeamBySpec(a, b)
                .kaiJ(`sameTeamBySpec(${j(a)}, ${j(b)})`)
            ),
        R.xprod(enemiesHead, enemiesRest)
            .map(([a, b]) => sameTeamBySpec(a, b)
                .kaiJ(`sameTeamBySpec(${j(a)}, ${j(b)})`)
            ),
    ].flatMap(R.identity);
    
    
    const verifyTeams = R.allPass(predicates).kaiJ(`R.allPass(${j(predicates)})`);

    //console.log({matchSpec, allies, enemies, predicates, verifyTeams: verifyTeams + ''});

    return verifyTeams;
}

/**
 * Given two specs, return whether the two participants described by specs A and B are on the same team.
 * 
 * @param {ParticipantSpec} specA 
 * @param {ParticipantSpec} specB 
 * @param {LightMatch} match 
 * @returns {boolean}
 */
 const sameTeamBySpec = R.curry(function sameTeamBySpec(specA, specB, match) {
    const {participants} = match;
    
    /*
    // TODO: Assume they are already 'identifying' and not empty?
    const xA = identifyingParticipantSpec(specA);
    const xB = identifyingParticipantSpec(specB);
    // if either of these is empty, assume they are equal.
    if (R.equals({}, xA) || R.equals({}, xB)) {
        return true;
    }
    */

    const playerA = participants.find(R.whereEq(specA));
    const playerB = participants.find(R.whereEq(specB));
    // If we couldn't find a participant by spec, what does it mean?
    // Do we assume they are on the same team or not?
    // What if we search by lolpros, but they just don't have it set for some reason?
    console.log('sameTeamBySpec', {specA, playerA, specB, playerB,});
    if (!playerA || !playerB) {
        return true;
    }

    return playerA.teamId === playerB.teamId;
});

/**
 * Get only identifying props.
 * 
 * @param {ParticipantSpec} spec Participant spec
 * @returns {object}
 */
function identifyingParticipantSpec(spec) {
    const UNIQUE_PROPS = [
        // not `role`, `items`
        'championId',
        'summonerName',
        'lolpros',
    ];

    const obj = {};

    for (const propName of UNIQUE_PROPS) {
        if (spec[propName]) {
            obj[propName] = spec[propName];
        }
    }
 
    return obj;
}
