import React from 'react';
import './App.css';
import BreakLength from './BreakLength';
import SessionLength from './SessionLength';
import Clock from './Clock';
import ReactFCCtest from 'react-fcctest';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App container-fluid">
        <h1>Pomodoro Clock</h1>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <BreakLength/>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <SessionLength/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Clock/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h6>Created and Designed by Kimberly Flores</h6>
          </div>
        </div>
    </div>
  );
}

export default App;
