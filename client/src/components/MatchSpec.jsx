import * as React from 'react';

import { Checkbox, STYLE_TYPE } from 'baseui/checkbox';
import { Select } from "baseui/select";
import { StatefulPopover } from "baseui/popover";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Block } from 'baseui/block';

import useMatchSpecStore from '../stores/MatchSpecStore.ts'

import ParticipantSpec from './ParticipantSpec.jsx';

// TODO: Move to /common.js
const TEAM_POSITIONS = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];
const TEAM_IDS = [100, 200];
const TEAM_COLORS = ['blue', 'red'];
/**
 * @param {number} teamId 
 * @returns {string}
 */
function toTeamColor(teamId) {
  return TEAM_COLORS[TEAM_IDS.indexOf(teamId)];
}

export default function MatchSpec() {
  const state = useMatchSpecStore((state) => state);
/*
  <details>
  <code style={{'whiteSpace': 'pre'}}>
    {JSON.stringify(state, null, 2)}
  </code>
  </details>
*/
  return (
    <>
      <Checkbox
        checked={state.enforceTeamIds}
        onChange={e => {
          const val = e.currentTarget.checked;
          state.setEnforceTeamIds(val);
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
