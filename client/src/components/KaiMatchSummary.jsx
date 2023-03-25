import * as React from 'react'

import {linkToMatch} from '../utils.js'
import {toTeamColor} from '../stores/common.ts'
import {championSquareImg} from '../stores/DdragonStore.ts'

/**
 * ParticipantLine component.
 */
function Line({participant}) {
    const p = participant;
    return <li className='line'>
            <span className='role'>{p.role}</span>
            <img alt={`Champion ID ${p.championId}`} className='champion' src={championSquareImg({id: p.championId})} />
            <span>{p.summonerName}</span>
    </li>
}

/**
 * Inspired by Mobalytics.gg's summary component.
 * 
 * @todo Create TriAvatar component.
 */
export default React.memo(function KaiMatchSummary({match, principal}) {
    const {participants} = match;

    const principalParticipant = match.participants.find(p => p.summonerName === principal.summonerName);
    const opponentParticipant  = match.participants.find(p => p !== principalParticipant && p.role === principalParticipant.role);

    const allies = participants.filter(p => p.teamId === principalParticipant.teamId);
    const enemies = participants.filter(p => p.teamId !== principalParticipant.teamId);

    const leagueofgraphsLink = linkToMatch(principal.region, match.id);
    const sideName = toTeamColor(principalParticipant.teamId);

    return (
    <article className='summary'>
        <div className='TriAvatar'>
            <img className="principal-champion" alt="Principal's champion"
                src={championSquareImg({id: principalParticipant.championId})}
            />
            <img className="principal-role" alt={principalParticipant.role}
                // src={principalParticipant.role}
            />
            <img className="principal-opponent" alt="Opponent's champion"
                src={championSquareImg({id: opponentParticipant.championId})}
            />
        </div>

        <div className='summary__badges'>
            <a className='badge' href={leagueofgraphsLink}>League of Graphs</a>
            <i className='badge'>{sideName} side</i>
        </div>
        
        <div className='summary__participants'>
            <ol className='allies'>{allies.map((p, i) => <Line key={i} participant={p} />)}</ol>
            <ol className='enemies'>{enemies.map((p, i) => <Line key={i} participant={p} />)}</ol>
        </div>
    </article>)

});
