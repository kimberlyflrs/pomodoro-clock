import React from 'react';
import './App.css';
import BreakLength from './BreakLength';
import SessionLength from './SessionLength';
import Clock from './Clock';
import ReactFCCtest from 'react-fcctest';

function App() {
  return (
    <div className="App">
      <ReactFCCtest/>
        <BreakLength/>
        <SessionLength/>
        <Clock/>
    </div>
  );
}

export default App;
