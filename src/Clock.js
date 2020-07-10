import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import { resetBreak, resetSession, reduceSession, startSession, startoverSession,reduceBreak, startBreak, startoverBreak } from './redux/actions';

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
    this.startBreak = this.startBreak.bind(this);
  }

  startClock(){
    //this works but needs to stop for the following conditions
    /* 1. minutes and seconds == 0
       2. if you click stop
       3. if reset is clicked
    */
   console.log('starting the session')
   document.getElementById('timer-label').innerHTML = "Session";
  this.props.startSession();
  const timer = setInterval(() => {
      if (!this.props.sessionStart){//if stop was clicked or reset
          clearInterval(timer);
          document.getElementById('start_stop').innerHTML = "start";
      }
      else if(this.props.sessionRemaining.getMinutes()===0 && this.props.sessionRemaining.getSeconds()===0){//if it gets to zero
        clearInterval(timer);
        this.props.startoverSession(); //reset session variable
        //make the sound
        this.startBreak();
      }
      else{
        this.props.reduceSession();
        document.getElementById('start_stop').innerHTML = "stop";
      }
    }, 1000);
  }


  startBreak(){
    //this will start the break session
    /*conditions to stop the clock
    1.minutes and seconds reach zero
    2.stop button is clicked
    3.reset is clicked
     */
    this.props.startBreak();
    const timer = setInterval(() => {
      if (!this.props.breakStart){//start and stop is clicked
          clearInterval(timer);
          document.getElementById('start_stop').innerHTML = "start";
      }
      else if(this.props.breakRemaining.getMinutes()===0 && this.props.breakRemaining.getSeconds()===0){//gets to zero
        clearInterval(timer);
        this.props.startoverBreak(); //reset break variable
        //make the sound
        this.startClock();
      }
      else{//keep erasing
        this.props.reduceBreak();
        document.getElementById('start_stop').innerHTML = "stop";
      }
    }, 1000);
    console.log('break will start now');
  }



  reset(){
    //resets the break and session
    console.log('resetting');
    this.props.resetBreak();
    this.props.resetSession();
  }

  render(){
    //i can do conditional rendering
    /*if session is on then render this button,
    if not do break rendering,
    if neither then session */
    if(this.props.breakStart){
      return(
        <div className="App">
        <h2 id="timer-label">Break</h2>
        <h3 id="time-left">{this.props.formatBreak}</h3>
        <button id="start_stop" onClick={this.startBreak}>start</button>
        <button id="reset" onClick={this.reset}>reset</button>
        </div>
      )
    }
    else{
      return(
        <div className="App">
        <h2 id="timer-label">Session</h2>
        <h3 id="time-left">{this.props.formatSession}</h3>
        <button id="start_stop" onClick={this.startClock}>start</button>
        <button id="reset" onClick={this.reset}>reset</button>
        </div>
      )
    }
  }
}

const mapStateToProps = state =>({
  breakRemaining:state.breakTime.breakRemaining,
  formatBreak: state.breakTime.formatted,
  breakStart: state.breakTime.breakStarted,
  
  
  sessionRemaining: state.sessionTime.sessionRemaining,
  formatSession: state.sessionTime.formatted,
  sessionStart: state.sessionTime.sessionStarted
});

const mapDispatchToProps = {
  resetBreak,
  resetSession,
  reduceSession,
  startSession,
  reduceBreak,
  startBreak,
  startoverSession,
  startoverBreak
};

export default connect(mapStateToProps,mapDispatchToProps)(Clock);

