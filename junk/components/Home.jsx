export function MatchesStats({matches}) {
    const hasPrincipalWon = principal => match => match.winnerTeam === match.participants.find(p => p.summonerName === principal.summonerName).teamId;
    const totalCount = matches.length;
    const winsCount  = matches.filter(hasPrincipalWon(principal));
    const lossesCount = totalCount - winsCount;
    
    return(
        <section>
            <h2>Stats</h2>
            <ul>
                <li>Games: {totalCount} ({winsCount} W - {lossesCount} L)
                <li>Number of times they got first turret: firstTurretCount ({firstTurretWinsCount} - {firstTurretLossesCount})
            </ul>
        </section>);
}

export function MatchesList({matches}) {
    return (
        <section>
            <h2>Match history</h2>
            <ol>
                {matches.map((m, i) => <li key={i}><KaiMatchSummary match={m}>)}
            </ol>
        </section>)

}

export default function Home(props) {
    const [principal] = useState({
        summonerName: 'Slogdog White',
        region: 'EUW'
    });
    const [hasPro, setHasPro] = useState(false);
    const [hasFirstTurret, setHasFirstTurret] = useState(false);

    // --- 

    const conditions = [];

    if (hasPro) conditions.add({
        pariticipants.lolpro: {$ne:null}
    });

    if (hasFirstTurret) conditions.add({
        firstTurretTakedown: {$in: [principal.summonerName]}
    });

    const filteredMatches = filterByQuery(matches, conditions);

    return <>
        <h1>Match Matcher</h1>

        <form className="principal">
            I am <input name="summoner" readonly value={principal.summonerName} />#<input readonly name="region" value={principal.region} />
            
            <hr />
            
            <button>First turret</button>
            <button>Has Pro</button>
        </form>
        
        Last updated: {data.createdAt}.
        
        Total games: {data.matches.length}.
        
        Only ranked games.

        <MatchesStats matches={filteredMatches} />
 
        <MatchesList matches={filteredMatches} />
        
    </>

}
