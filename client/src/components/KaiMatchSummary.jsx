import * as React from 'react'

import {linkToMatch} from '../utils.js'

/**
 * Inspired by Mobalytics.gg's summary component
 */
export default React.memo(function KaiMatchSummary({match, principal}) {
    const {participants} = match;

    const principalParticipant = match.participants.find(p => p.summonerName === principal.summonerName);
    const opponentParticipant  = match.participants.find(p => p !== principalParticipant && p.teamPosition === principalParticipant.teamPosition);

    const allies = participants.filter(p => p.teamId === principalParticipant.teamId);
    const enemies = participants.filter(p => p.teamId !== principalParticipant.teamId);

    const leagueofgraphsLink = linkToMatch(principal.region, match.id);
    const sideName = principalParticipant.teamId === 100 ? 'blue' : 'red';

    return (
    <article className="summary">
        <div>
            <img src={principalParticipant.championId} className="principal-champion" alt="Principal's champion" />
            <img src={principalParticipant.teamPosition} className="principal-role" />
            <img src={opponentParticipant.championId} className="principal-opponent" alt="Opponent's champion" />
        </div>

        Badges:
            <a href={leagueofgraphsLink}>League of Graphs</a>
            <i>{sideName} side</i>
        
        Participants:
        <div>
            <ol className='allies'>
                {allies.map((p, i) => <li key={i}>
                <i className={p.lolpros ? 'has-lolpros' : ''}>Lolpros</i>
                    {p.championId}
                    {p.teamPosition}
                    {p.summonerName}
                </li>)}
            </ol>
            <ol className='enemies'>
                {enemies.map((p, i) => <li key={i}>
                    <i className={p.lolpros ? 'has-lolpros' : ''}>Lolpros</i>
                    {p.championId}
                    {p.teamPosition}
                    {p.summonerName}
                </li>)}
            </ol>
        </div>
    </article>)

});
