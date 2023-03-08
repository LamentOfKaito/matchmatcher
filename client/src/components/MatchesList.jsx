import KaiMatchSummary from './KaiMatchSummary.jsx'

export default function MatchesList({ matches, principal }) {
    return (
        <section className="matchlist">
            <h2>Matches</h2>
            <ol>
                {
                    matches.map(m => <li key={m.id}><KaiMatchSummary match={m} principal={principal} /></li>)
                }
            </ol>
        </section>);
}
