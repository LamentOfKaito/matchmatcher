import * as React from 'react';

import { Checkbox, STYLE_TYPE } from 'baseui/checkbox';

import { TEAM_IDS, toTeamColor } from '../stores/common.ts';
import useMatchSpecStore from '../stores/MatchSpecStore.ts'
import ParticipantSpec from './ParticipantSpec.jsx';
import { tidyMatchSpec } from '../stores/toRamdaQuery.ts';

export default function MatchSpec() {
  const matchSpec = useMatchSpecStore((state) => state);

  return (
    <>
      <Checkbox
        checked={matchSpec.enforceTeamIds}
        onChange={e => {
          const val = e.currentTarget.checked;
          matchSpec.setEnforceTeamIds(val);
        }}
        checkmarkType={STYLE_TYPE.toggle_round}
      >
        Enforce team colors
      </Checkbox>

        <div className='teams'>
          <TeamSpec teamId={TEAM_IDS[0]} />
          <TeamSpec teamId={TEAM_IDS[1]} />
        </div>        
    </>)
}

function TeamSpec({ teamId }) {
  const state = useMatchSpecStore((state) => state);
  const enforceTeamIds = state.enforceTeamIds;
  const participants = state.participants.filter(p => p.teamId === teamId);

  const teamColorClass = enforceTeamIds ? '--' + toTeamColor(teamId) : '';

  return (<div className={['team', teamColorClass].join(' ')}>
    {participants.map(p => <ParticipantSpec key={p.nickname} participant={p} />)}
  </div>)
}
