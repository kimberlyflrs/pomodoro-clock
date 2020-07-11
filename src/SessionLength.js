import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import { increaseSession, decreaseSession } from './redux/actions'
import {Button} from 'react-bootstrap';


class SessionLength extends React.Component{
  constructor(props){
    super(props);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
  }

  increaseSession(){
    if(!this.props.sessionStarted && !this.props.breakStarted){
      this.props.increaseSession()
    }
  }

  decreaseSession(){
    if(!this.props.sessionStarted && !this.props.breakStarted){
      this.props.decreaseSession()
    }
  }


  render(){
    return (
      <div>
        <h2 id="session-label">Session Length</h2>
        <div className="row breakinfo">
        <Button id="session-increment" onClick={this.increaseSession} className="spacing">+</Button>
        <h3 id="session-length">{this.props.sessionTime}</h3>
        <Button id="session-decrement" onClick={this.decreaseSession} className="spacing">-</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  sessionTime: state.sessionTime.session,
  sessionStarted: state.sessionTime.sessionStarted,
  breakStarted: state.breakTime.breakStarted
});

const mapDispatchToProps = {
  increaseSession,
  decreaseSession
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionLength);
