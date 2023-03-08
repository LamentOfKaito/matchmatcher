const hasPrincipalWon = principal => match =>
    match.winningTeamId === match.participants.find(p => p.summonerName === principal.summonerName).teamId;

export default function MatchesStats({matches, principal}) {
    const totalCount = matches.length;
    const winsCount  = matches.filter(hasPrincipalWon(principal)).length;
    const lossesCount = totalCount - winsCount;
    
    return(
        <section>
            <h2>Stats</h2>
            <ul>
                <li>Games: {totalCount} ({winsCount} W - {lossesCount} L)</li>
                <li>(TODO) Number of times they got first turret: firstTurretCount (firstTurretWinsCount - firstTurretLossesCount)</li>
            </ul>
        </section>);
}
