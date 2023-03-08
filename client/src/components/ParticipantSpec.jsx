import * as React from 'react';

import {Checkbox, STYLE_TYPE} from 'baseui/checkbox';
import { Select } from "baseui/select";
import { StatefulPopover } from "baseui/popover";
import { Input } from "baseui/input";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import {Block} from 'baseui/block';
import { Overflow } from 'baseui/icon';

import useMatchSpecStore from '../stores/MatchSpecStore.ts'

export default function ParticipantSpec({participant}) {
    const p = useMatchSpecStore(state => state.participants.find(p => p.idx === participant.idx));
    const [setProp, unsetChampion, unsetRole] = useMatchSpecStore(state => [state.setProp, state.unsetChampion, state.unsetRole]);
    const setSome = (propName, val) => setProp(propName, p.idx, val);

    const NAME_DOMAINS = [
        {
            id: 'SUMMONER_NAME', label: 'Summoner name', icon: 'riot', allowEmptyValue: false,
        },
        {
            id: 'LOLPROS', label: 'Lolpros', icon: 'lolpros', allowEmptyValue: true
        },
        {
            id: 'TWITCH', label: 'Twitch', icon: 'twitch', allowEmptyValue: true
        },
    ];

    const ROLE_OPTIONS = [
        {label: 'Any', id: '*'},
        {label: 'Top', id: 'TOP'},
        {label: 'Jungle', id: 'JUNGLE'},
        {label: 'Middle', id: 'MIDDLE'},
        {label: 'Bottom', id: 'BOTTOM'},
        {label: 'Support', id: 'UTILITY'}   
    ];

    const CHAMPION_OPTIONS = [
        {label: 'Aatrox', id: 1},
        {label: 'Quinn', id: 2},
    ];

    const ITEM_OPTIONS = [
        {label: 'Everfrost', id: 1},
        {label: 'Eclipse', id: 2},
    ];

    return (
    <div className='participant'>
        {p.nickname}
        <Select
            options={ROLE_OPTIONS}
            value={p.roleName}
            placeholder="Select role"
            onChange={params => {
                unsetRole(p.teamId, p.roleName);
                setSome('roleName', params.value);
                }}
            />

        <Select
            options={CHAMPION_OPTIONS}
            value={p.championName}
            placeholder="Select champion"
            onChange={params => {
                unsetChampion(p.championName);
                setSome('championName', params.value);
            }}
        />
        
    <div>
        <Select
            placeholder="Name domain"
            options={NAME_DOMAINS}
            value={p.nameDomain}
            onChange={params => {
                setSome('nameDomain', params.value);
            }}
        />
        <Input
            placeholder="Name value"
            value={p.nameValue}
            onChange={params => {
                setSome('nameValue', params.value);
            }}
            />
    </div>
    
    <StatefulPopover
      content={() => (
        <Block padding={"10px"}>
            <Checkbox
                checked={p.hasLolpros}
                onChange={e => setSome('hasLolpros', e.target.checked)}
            >
                Has Lolpros profile?
            </Checkbox>

            <Checkbox disabled>
                Has first blood Kill?
            </Checkbox>

            <Checkbox
                checked={p.hasFirstTower}
                onChange={e => setSome('hasFirstTower', e.target.checked)}
            >
                Has first tower takedown?
            </Checkbox>

            Has items:
                <Select
                    options={ITEM_OPTIONS}
                    value={p.items}
                    multi
                    placeholder="Select items"
                    onChange={params => setSome('items', params.value)}
                    />
        </Block>
      )}
      returnFocus
      autoFocus
    >
      <Button
            kind={KIND.secondary}
            size={SIZE.compact}
            shape={SHAPE.square}
        >
        <Overflow />
      </Button>
    </StatefulPopover>
    </div>
    );
}
