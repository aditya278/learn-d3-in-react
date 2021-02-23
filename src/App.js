import React from 'react';
import './App.css';

import Circles from './components/Circles';
import CurvedLine from './components/CurvedLine';
import SmileyFace from './components/smiley/SmileyFace';

function App() {

  return (
    <div className="App">
      <SmileyFace width={960} height={500} radius={250} />
    </div>
  );
}

export default App;