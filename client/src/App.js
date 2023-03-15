import { useState, useEffect, useMemo } from 'react';

import './App.css';
import useDdragonStore from './stores/DdragonStore.ts';

import MatchSpec from './components/MatchSpec.jsx';
import MatchesStats from './components/MatchesStats.jsx';
import MatchesList from './components/MatchesList.jsx';

import useMatchSpecStore from './stores/MatchSpecStore.ts'
import {toRamdaQuery, tidyMatchSpec} from './stores/toRamdaQuery.ts'

function App() {
  const [principal] = useState({region: 'euw', summonerName: 'Slogdog White'});
  const setDdragonData = useDdragonStore(state => state.setData);
  const [ddragonLoaded, setDdragonLoaded] = useState(false);
  const [matches, setMatches] = useState([]);
  const [matchesLoaded, setMatchesLoaded] = useState(false);

  const matchSpecState = useMatchSpecStore(state => state);

  const filteredMatches = useMemo(function(){
    console.log('Filtering...');
    const fn = toRamdaQuery(tidyMatchSpec(matchSpecState));
    return matches.filter(m => {
      const passed = fn(m);
      //console.log({passed, fn: fn.toString(), m, matchSpecState: tidyMatchSpec(matchSpecState)});
      return passed;

    });
  }, [matches, matchSpecState]);

  useEffect(() => {
    async function fetchData() {
      const BASE = 'http://localhost:3000';
      const lightDataUrl = `${BASE}/light-data`;
      const matchesUrl = `${BASE}/light-matches/${principal.region}/${principal.summonerName}`;
  
      setDdragonData(await fetch(lightDataUrl).then(res => res.json()));
      setDdragonLoaded(true);
      
      const matches = await fetch(matchesUrl).then(res => res.json());
      setMatches(matches/*.slice(0, 2)*/);
      setMatchesLoaded(true);
    }
    fetchData();
  }, [principal]);

  return (
    <>
      <header>
        <h1>MatchMatcher</h1>

        <div className='principal'>
          <span className='principal__name'>{principal.summonerName}</span>
          #
          <span className='principal__region'>{principal.region}</span>
        </div>
      </header>

      <MatchSpec />
      
      {(!ddragonLoaded || !matchesLoaded) ? 'Loading...' :
      <div>
        <MatchesStats matches={filteredMatches} principal={principal} />
        <MatchesList matches={filteredMatches} principal={principal} />
      </div>}
    </>
  );
}

export default App;
