import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import { increaseBreak, decreaseBreak } from './redux/actions'



class BreakLength extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div className="App">
        <h2 id="break-label">Break Length</h2>
        <button id="break-increment" onClick={()=>this.props.increaseBreak()}>increase</button>
        <h3 id="break-length">{this.props.breakTime}</h3>
        <button id="break-decrement" onClick={()=>this.props.decreaseBreak()}>decrease</button>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  breakTime: state.breakTime.break,
});

const mapDispatchToProps = {
  increaseBreak,
  decreaseBreak
};

export default connect(mapStateToProps, mapDispatchToProps)(BreakLength);
