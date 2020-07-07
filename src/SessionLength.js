import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import { increaseSession, decreaseSession } from './redux/actions'



class SessionLength extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div className="App">
        <h2 id="session-label">Session Length</h2>
        <button id="session-increment" onClick={()=>this.props.increaseSession()}>increase</button>
        <h3 id="session-length">{this.props.sessionTime}</h3>
        <button id="session-decrement" onClick={()=>this.props.decreaseSession()}>decrease</button>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  sessionTime: state.sessionTime.session,
});

const mapDispatchToProps = {
  increaseSession,
  decreaseSession
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionLength);
