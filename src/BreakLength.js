import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import { increaseBreak, decreaseBreak } from './redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';



class BreakLength extends React.Component{
  constructor(props){
    super(props);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
  }
S
  increaseBreak(){
    if(!this.props.sessionStarted && !this.props.breakStarted){
      this.props.increaseBreak()
    }
  }

  decreaseBreak(){
    if(!this.props.sessionStarted && !this.props.breakStarted){
      this.props.decreaseBreak()
    }
  }


  render(){
    return (
      <div>
        <h2 id="break-label">Break Length</h2>
        <div className="row breakinfo">
        <Button id="break-increment" onClick={this.increaseBreak} className="spacing">+</Button>
          <h3 id="break-length">{this.props.breakTime}</h3>
        <Button id="break-decrement" onClick={this.decreaseBreak} className="spacing">-</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  breakTime: state.breakTime.break,
  breakStarted: state.breakTime.breakStarted,
  sessionStarted:state.sessionTime.sessionStarted
});

const mapDispatchToProps = {
  increaseBreak,
  decreaseBreak
};

export default connect(mapStateToProps, mapDispatchToProps)(BreakLength);
