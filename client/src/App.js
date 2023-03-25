import { useState, useEffect, useMemo } from 'react';

import './App.css';

import {Loader} from './components/index.ts';
import MatchSpec from './components/MatchSpec.jsx';
import MatchesStats from './components/MatchesStats.jsx';
import MatchesList from './components/MatchesList.jsx';

import useDdragonStore from './stores/DdragonStore.ts';
import useMatchSpecStore from './stores/MatchSpecStore.ts'
import {toRamdaQuery, tidyMatchSpec} from './stores/toRamdaQuery.ts'
import { getSize } from './utils.js';

function App() {
  const [principal] = useState({region: 'euw', summonerName: 'Slogdog White'});
  const [progress, setProgress] = useState({ddragonLoaded: false, matchesLoaded: false, ddragonSize: -1, matchesSize: -1});
  const [matches, setMatches] = useState([]);
  const setDdragonData = useDdragonStore(state => state.setData);
  const matchSpecState = useMatchSpecStore(state => state);

  const filteredMatches = useMemo(function(){
    //console.log('Filtering...');
    const fn = toRamdaQuery(tidyMatchSpec(matchSpecState));
    return matches.filter(m => {
      const passed = fn(m);
      //console.log({passed, fn: fn.toString(), m, matchSpecState: tidyMatchSpec(matchSpecState)});
      return passed;

    });
  }, [matches, matchSpecState]);

  useEffect(() => {
    async function fetchData() {
      //const BASE = 'http://matchmatcher.vercel.app';
      //const lightDataUrl = `${BASE}/light-data`;
      //const matchesUrl = `${BASE}/light-matches/${principal.region}/${principal.summonerName}`;
  
      const ddragonUrl = './light-ddragon.json';
      const matchesUrl = './light-matches.json';
      const ddragonSize = await getSize(ddragonUrl);
      const matchesSize = await getSize(matchesUrl);
      setProgress(prev => ({...prev, ddragonSize, matchesSize}));

      const ddragonData = await fetch(ddragonUrl).then(res => res.json());
      setDdragonData(ddragonData);
      setProgress(prev => ({...prev, ddragonLoaded: true}));
            
      const matches = await fetch(matchesUrl).then(res => res.json());
      setMatches(matches/*.slice(0, 3)*/);
      setProgress(prev => ({...prev, matchesLoaded: true}));
    }
    fetchData();
  }, []);

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
      
      {(!progress.ddragonLoaded || !progress.matchesLoaded) ? <Loader progress={progress} /> :
      <div>
        <MatchesStats matches={filteredMatches} principal={principal} />
        <MatchesList matches={filteredMatches} principal={principal} />
      </div>}
    </>
  );
}

export default App;
