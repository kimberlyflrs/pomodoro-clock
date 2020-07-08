import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import { resetBreak, resetSession, reduceSession, startSession } from './redux/actions';

//when the time reaches zero, play the beep sound, then count down break
//we need to format the time left

//turn this into a class where we have the break, session, start t/f, reset, stop which
//pauses the time, was it stopped t/f

/*
THINGS TO DO
-add the break logic which is similar to the session logic
-loop the clock
--when session is over, start the break, and so on
---change the label session to break and so on
*/

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state={
      break: this.props.breakTime,
      start: false,
      stop:false,
      resetClicked: false,
      previousOver: false
    }
    this.reset = this.reset.bind(this);
    this.startClock = this.startClock.bind(this);
  }

  startClock(){
    //this works but needs to stop for the following conditions
    /* 1. minutes and seconds == 0
       2. if you click stop
       3. if reset is clicked
    */
  this.props.startSession();
  const timer = setInterval(() => {
      if (!this.props.sessionStart || (this.props.sessionRemaining.getMinutes()===0 && this.props.sessionRemaining.getSeconds()===0)){
          clearInterval(timer);
          document.getElementById('start_stop').innerHTML = "start";
      }
      else{
        this.props.reduceSession();
        document.getElementById('start_stop').innerHTML = "stop";
      }
    }, 1000);
  }



  reset(){
    //resets the break and session
    console.log('resetting');
    this.props.resetBreak();
    this.props.resetSession();
  }

  render(){
    return (
      <div className="App">
      <h2 id="timer-label">Session</h2>
      <h3 id="time-left">{this.props.formatSession}</h3>
      <button id="start_stop" onClick={this.startClock}>start</button>
      <button id="reset" onClick={this.reset}>reset</button>
</div>
    );
  }
}

const mapStateToProps = state =>({
  breakTime: state.breakTime.break,
  sessionRemaining: state.sessionTime.sessionRemaining,
  formatSession: state.sessionTime.formatted,
  reset: state.sessionTime.reset,
  sessionStart: state.sessionTime.sessionStarted
});

const mapDispatchToProps = {
  resetBreak,
  resetSession,
  reduceSession,
  startSession
};

export default connect(mapStateToProps,mapDispatchToProps)(Clock);

