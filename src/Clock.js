import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import { resetBreak, resetSession, reduceSession } from './redux/actions';
import moment from 'moment';

//when the time reaches zero, play the beep sound, then count down break
//we need to format the time left

//turn this into a class where we have the break, session, start t/f, reset, stop which
//pauses the time, was it stopped t/f

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state={
      break: this.props.breakTime,
      session: this.props.sessionTime,
      start: false,
      timeleft: this.props.sessionTime,
      previousOver: false
    }
    this.reset = this.reset.bind(this);
    this.startClock = this.startClock.bind(this);
  }

  formatTime(){
    //must be in mm:ss format
    //if mm:00 -> mm:59
    //then continue decreaseing
  }

  startClock(){
    //starts the clock with the session, then break, then repeats until stopped
    if(this.state.start){//if countdown started
      console.log('we are shutting off');
      //set inner text to start
      document.getElementById('start_stop').innerHTML='start';
      this.setState({
        start:false
      })
    }
    else{//if not started
      console.log('we are running');
      //set inner text to stop
      document.getElementById('start_stop').innerHTML='stop';
      this.props.reduceSession();
      this.setState({
        start:true
      })
    }
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
    <h3 id="time-left">{this.props.sessionRemaining}</h3>
      <button id="start_stop" onClick={this.startClock}>start</button>
      <button id="reset" onClick={this.reset}>reset</button>
</div>
    );
  }
}

const mapStateToProps = state =>({
  breakTime: state.breakTime.break,
  sessionTime: state.sessionTime.session,
  sessionRemaining: state.sessionTime.sessionRemaining
});

const mapDispatchToProps = {
  resetBreak,
  resetSession,
  reduceSession
};

export default connect(mapStateToProps,mapDispatchToProps)(Clock);

