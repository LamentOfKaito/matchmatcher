/**
 * MongoDB Query
 *
 * @todo Create sameTeam predicate
 * @todo Create isTeam predicate
 * @todo Maybe differentiate between participants 
 * 
 * @param {MatchSpecData} matchSpecData
 * @returns {object} Mongo query
 */
function toQuery(matchSpecData) {
    const finalQuery = 
    {
        $and: participants.map(participantPartialQuery)
    }

    if (!enforceTeamIds) {
        uniqueP = findUniqueParticipant(matchSpecData)
        $$teamX = uniqueP.teamId
        
        groupBy(teamId)
    }

    return finalQuery;
}

function participantPartialQuery(someCentalizedData) {
    let obj = {
        $or: []
    }

    if (enforceTeamIds) {
        obj.teamId = teamId;
    }

    if (championName) {
        championId = championsMap.get(championName);
        obj.championId = championId;
    }
    
    if (role) {
        obj.teamPosition = role;
    }

    if (nameDomain === 'SUMMONER_NAME' && nameValue) {
        obj.summonerName = nameValue;
    }

    if (nameDomain === 'LOLPROS') {
        obj.lolpros = {$nnull: true};
        if (nameValue) {
            obj.lolpros = nameValue;
        }
    }

    if (nameDomain === 'TWITCH') {
        obj.twitch = {$nnull: true};
        if (nameValue) {
            obj.twitch = nameValue;
        }
    }

    // Extra
    
    if (isFirstblood) {
        obj.firstBloodKill = true
    }
    
    if (isFirstTurret) {
        obj.$or.push({firstTurretKill: true});
        obj.$or.push({firstTurretAssist: true});
    }
    
    return obj;
}
