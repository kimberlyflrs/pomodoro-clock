import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import { resetBreak, resetSession, reduceSession, startSession, startoverSession,reduceBreak, startBreak, startoverBreak } from './redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state={
      sessionpaused: false,
      breakpaused: true,
      resetclicked:false
    }
    this.reset = this.reset.bind(this);
    this.startClock = this.startClock.bind(this);
    this.startBreak = this.startBreak.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.stopAudio = this.stopAudio.bind(this);
  }

  startClock(){
    //this works but needs to stop for the following conditions
    /* 1. minutes and seconds == 0
       2. if you click stop
       3. if reset is clicked
    */

   this.setState({
     resetclicked:false,
     sessionpaused: !this.state.sessionpaused
   })
   this.props.startSession();
   const timer = setInterval(() => {
      if (!this.state.sessionpaused || this.state.resetclicked){//if stop was clicked or reset
          clearInterval(timer);
          document.getElementById('start_stop').innerHTML = "start";
      }
      else if(this.props.sessionRemaining.getMinutes()===0 && this.props.sessionRemaining.getSeconds()===0){//if it gets to zero
        clearInterval(timer);
        this.props.startoverSession(); //reset session variable
        this.setState({
          sessionpaused:false
        })
        this.playAudio()
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
    this.setState({
      breakpaused:!this.state.breakpaused,
      resetclicked:false
    })
    this.props.startBreak();
    const timer = setInterval(() => {
      if (this.state.breakpaused || this.state.resetclicked){//start and stop is clicked
          clearInterval(timer);
          document.getElementById('start_stop').innerHTML = "start";
      }
      else if(this.props.breakRemaining.getMinutes()===0 && this.props.breakRemaining.getSeconds()===0){//gets to zero
        clearInterval(timer);
        this.props.startoverBreak(); //reset break variable
        this.setState({
          breakpaused: true
        })
        this.playAudio();
        this.startClock();
      }
      else{//keep erasing
        this.props.reduceBreak();
        document.getElementById('start_stop').innerHTML = "stop";
      }
    }, 1000);
  }



playAudio(){
  //plays beeping sound once time is over
  var audio = document.getElementById('beep');
  audio.play()
}


stopAudio(){
  var audio = document.getElementById('beep');
  audio.pause()
  audio.load()
}




  reset(){
    //resets the break and session
    this.stopAudio()
    this.setState({
      resetclicked:true,
      sessionpaused:false,
      breakpaused:true
    })
    this.props.resetBreak();
    this.props.resetSession();
  }

  render(){
    if(this.props.breakStart){
      return(
        <div>
        <h2 id="timer-label">Break</h2>
        <div className="row breakinfo">
          <div className="circle">
            <h3 id="time-left">{this.props.formatBreak}</h3>
          </div>
        </div>
        <Button id="start_stop" onClick={this.startBreak} className="spacing">start</Button>
        <Button id="reset" onClick={this.reset} className="spacing">reset</Button>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
        />
        </div>
      )
    }
    else{
      return(
        <div>
        <h2 id="timer-label">Session</h2>
        <div className="row breakinfo">
          <div className="circle">
          <h3 id="time-left">{this.props.formatSession}</h3>
          </div>
        </div>
        <Button id="start_stop" onClick={this.startClock} className="spacing">start</Button>
        <Button id="reset" onClick={this.reset} className="spacing">reset</Button>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
        />
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

