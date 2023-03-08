import './App.css';
import useSpecStore from './stores/MatchSpecStore.ts';
import { useState, useEffect } from 'react';

import MatchSpec from './components/MatchSpec.jsx';
import MatchesStats from './components/MatchesStats.jsx';
import MatchesList from './components/MatchesList.jsx';

function App() {
  const [principal] = useState({region: 'euw', summonerName: 'Slogdog White'});
  const [lightData, setLightData] = useState(null);
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const BASE = 'http://localhost:3000';
      const lightDataUrl = `${BASE}/light-data`;
      const matchesUrl = `${BASE}/light-matches/${principal.region}/${principal.summonerName}`;
  
      setLightData(await fetch(lightDataUrl).then(res => res.json()));
      //setMatches(await fetch(matchesUrl).then(res => res.json()));
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
      
      {(!lightData || !matches) ? null :
      <div>
      <MatchesStats matches={matches} principal={principal} />
      <MatchesList matches={matches} principal={principal} />
      </div>}
    </>
  );
}

export default App;
