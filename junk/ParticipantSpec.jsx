/**
 * itemsPool: {uniquePerPlayer: true}
 */
function MatchSpec() {
    return (
        <>
            <Toggle enforce teamId />

            <Divider />

            <TeamSpec teamId={0} />
            <TeamSpec teamId={1} />
        </>
    )
}

function TeamSpec({teamId}) {
    let teamColor = '';
    if (enforceTeamId) {
        teamColor = ['blue', 'red'][teamId];
    }
    
    const participantIndexes = [];
    for (i = 0; i < 10; i++) {
        participantIndexes.push(i);
    }

    return (<div className={teamColor}>
        {participantIndexes.map(i => <ParticipantSpec index={i} />)}
    </div>)
}
 

function ParticipantSpec() {
    const nameDomains = [
        {
            id: 'SUMMONER_NAME', label: 'Summoner name', icon: 'riot', allowEmptyValue: false,
            attrs: {selected: 'selected'}
        },
        {
            id: 'LOLPROS', label: 'Lolpros', icon: 'lolpros', allowEmptyValue: true
        },
        {
            id: 'TWITCH', label: 'Twitch', icon: 'twitch', allowEmptyValue: true
        },
    ]

    return (
    <>
    // Instead of using a select (or multi-value "toggle") component, we could make so that the ParticipantSpec is draggable and its `role` depends on the Participant's index in the TeamSpec.
    // The issue: To my knowledge, there is no guarantee that there must be 5 unique roles assigned to each of the 5 participants.
    <select name="role">
    </select>

    <select championName />
    
    <Divider />
    
    <group>
        <select name="nameDomain">
            {nameDomains.map(d => <option value={d.value} {...d.attrs}>{d.label}</option>)}
        </select>
        // maxLength should be considered only if nameDomain is SUMMONER_NAME
        <input name="nameValue" maxlengh={16} />
    </group>

    <Divider />

    <button>More options</button>
        <section>
            Has first blood (kill) <toggle firstKill kill />
            Has first turret (kill or assit)<toggle firstTurret takedown />
            Has items: <select multi options={items} />
        </section>
    </>
    );
}
