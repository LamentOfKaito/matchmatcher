/**
 * Inspired by Mobalytics.gg's summary component
 */
export default function KaiMatchSummary({match}) {
    
    const leagueofgraphsLink = '';
    
    return (
    <article className="summary">
        <div>
            <img className="principal-champion" alt="Principal's champion" />
            <img className="principal-role" />
            <img className="opponent-champion" alt="Opponent's champion" />
        </div>

        Badges:
            <a href={leagueofgraphsLink}>League of Graphs</a>
            <span>First turret?</span>
        
        Participants:
        <ul>
            {participants.map((p, i) => <li key={i}>
                <input className="lolpro" type="checkbox" checked={!!p.lolpro} />
                    {p.summonerName}
            </li>)}
        </ul>
    </article>)

}
