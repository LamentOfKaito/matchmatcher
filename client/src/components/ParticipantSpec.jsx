import * as React from 'react';

import { Checkbox, STYLE_TYPE } from 'baseui/checkbox';
import { Select } from "baseui/select";
import { StatefulPopover } from "baseui/popover";
import { Input } from "baseui/input";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { Block } from 'baseui/block';
import { Overflow } from 'baseui/icon';

import { NAME_DOMAINS, ROLE_OPTIONS } from '../stores/common.ts';
import useMatchSpecStore from '../stores/MatchSpecStore.ts'
import useDdragonStore from '../stores/DdragonStore.ts'

export default function ParticipantSpec({participant}) {
    const p = useMatchSpecStore(state => state.participants.find(p => p.idx === participant.idx));
    const [setProp, unsetChampion, unsetRole] = useMatchSpecStore(state => [state.setProp, state.unsetChampion, state.unsetRole]);

    const setSome = (propName, val) => setProp(propName, p.idx, val);
    // setProp(`${propName}Selected`, val)
    const setSelected = (propName, val) => setProp(`${propName}Selected`, p.idx, val);

    const [lightChampions, lightItems] = useDdragonStore(state => [state.champions, state.items]);


    return (
    <div className='participant' title={p.nickname}>
        <Select
            placeholder="Select role"
            options={ROLE_OPTIONS}
            value={p.roleSelected}
            size={SIZE.mini}
            onChange={params => {
                unsetRole(p.teamId, p.role);
                setSelected('role', params.value);
                }}
            />

        <Select
            placeholder="Select champion"
            options={lightChampions}
            labelKey='name'
            size={SIZE.mini}
            value={p.championSelected}
            onChange={params => {
                unsetChampion(p.champion);
                setSelected('champion', params.value);
            }}
        />
        
    <div style={{display: 'flex'}}>
        <Select
            placeholder="Name domain"
            options={NAME_DOMAINS}
            value={p.nameDomainSelected}
            size={SIZE.mini}
            onChange={params => {
                setSelected('nameDomain', params.value);
            }}
        />
        <Input
            placeholder="Name value"
            value={p.nameValue}
            onChange={params => {
                setSelected('nameValue', params.value);
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
                    options={lightItems}
                    labelKey='name'
                    value={p.itemsSelected}
                    multi
                    placeholder="Select items"
                    size={SIZE.mini}
                    onChange={params => setSelected('items', params.value)}
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
