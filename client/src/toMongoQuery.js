/**
 * Create MongoDB Query
 *
 * @todo Create sameTeam predicate
 * @todo Create isTeam predicate
 * @todo Maybe differentiate between participants 
 * 
 * @param {MatchSpecData} matchSpec
 * @returns {object} Mongo query
 */
function toMongoQuery(matchSpec) {
    const finalQuery = 
    {
        $all: matchSpec.participants.map(participantQuery).map(obj => {
            return {
                $elemMatch: obj
            }
        })
    }

    return finalQuery;
}

function participantQuery(participantSpec) {
    const p = participantSpec;
    
    let obj = {
        $or: []
    }

    if (p.teamId) {
        obj.teamId = p.teamId;
    }

    if (p.championId) {
        obj.championId = p.championId;
    }
    
    if (p.role) {
        obj.teamPosition = p.role;
    }

    if (p.nameDomain === 'SUMMONER_NAME' && p.nameValue) {
        obj.summonerName = p.nameValue;
    }

    if (p.nameDomain === 'LOLPROS') {
        obj.lolpros = {$nnull: true};
        if (p.nameValue) {
            obj.lolpros = p.nameValue;
        }
    }

    // Extra
    
    if (p.isFirstblood) {
        obj.firstBloodKill = true
    }
    
    if (p.isFirstTurret) {
        obj.$or.push({firstTurretKill: true});
        obj.$or.push({firstTurretAssist: true});
    }
    
    return obj;
}
