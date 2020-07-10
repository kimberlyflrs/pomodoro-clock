import { INCREASE_SESSION, DECREASE_SESSION, START_SESSION, RESET_SESSION, REDUCE_SESSION, STARTOVER_SESSION } from "../actionTypes";

var remainingTime = new Date();
remainingTime.setMinutes(25);
remainingTime.setSeconds(0);

const initialState = {
  session: 25,
  sessionRemaining: remainingTime,
  formatted: '25:00',
  reset:false,
  sessionStarted:false
};

//if less than ten in minutes or seconds, add a zero in front of it

const sessionTime = (state = initialState, action) =>{
  switch (action.type) {
    case INCREASE_SESSION: {
      if(state.session===60){
        var remaining = new Date();
        remaining.setMinutes(60);
        remaining.setSeconds(0);
        return{
          session: state.session,
          sessionRemaining: remaining,
          formatted: '60:00',
          reset:false,
          sessionStarted:false
        }
      }
      else{
        var remaining = new Date();
        remaining.setMinutes(state.session+1);
        remaining.setSeconds(0);
        if(state.session+1<10){
          return {
            session: state.session+1,
            sessionRemaining: remaining,
            formatted: '0'+remaining.getMinutes()+':00',
            reset:false,
            sessionStarted:false
          }
        }
        else{
          return {
            session: state.session+1,
            sessionRemaining: remaining,
            formatted: remaining.getMinutes()+':00',
            reset:false,
            sessionStarted:false
          }
        }
      }
    }


    case DECREASE_SESSION: {
      if(state.session === 1){
        var remaining = new Date();
        remaining.setMinutes(1);
        remaining.setSeconds(0);
          return {
            session: state.session,
            sessionRemaining: remaining,
            formatted: '01:00',
            reset:false,
            sessionStarted:false
          }
      }
      else{
        var remaining = new Date();
        remaining.setMinutes(state.session-1);
        remaining.setSeconds(0);
        if(state.session-1<10){
          return {
            session: state.session-1,
            sessionRemaining: remaining,
            formatted: '0'+remaining.getMinutes()+':00',
            reset:false,
            sessionStarted:false
          };
        }
        else{
        return {
            session: state.session-1,
            sessionRemaining: remaining,
            formatted: remaining.getMinutes()+':00',
            reset:false,
            sessionStarted:false
          };
        }
      }
    }



    case RESET_SESSION:{
      var remaining = new Date();
      remaining.setMinutes(25);
      remaining.setSeconds(0);
      return {session:25,
      sessionRemaining: remaining,
      formatted: '25:00',
      reset: true,
      sessionStarted:false
    }
    }



    case REDUCE_SESSION:{
      var newremainder = new Date(state.sessionRemaining);
      newremainder.setSeconds(state.sessionRemaining.getSeconds()-1);
      console.log(newremainder.getMinutes() + ":"+newremainder.getSeconds());
      //if minutes <10 add a zero
      var minutes;
      var seconds;
      if(newremainder.getMinutes()<10){
        minutes = "0"+newremainder.getMinutes()
      }
      else{
        minutes = newremainder.getMinutes()
      }
      //if seconds <10 add a zero
      if(newremainder.getSeconds()<10){
        seconds = "0"+newremainder.getSeconds()
      }
      else{
        seconds = newremainder.getSeconds()
      }
      
      return {
        session: state.session,
        sessionRemaining: newremainder,
        formatted: minutes+':'+seconds,
        reset:false,
        sessionStarted:true
      }
    }



    case START_SESSION:{
      return{
        session: state.session,
        sessionRemaining: state.sessionRemaining,
        formatted: state.formatted,
        reset: false,
        sessionStarted:!state.sessionStarted
      }
    }


    case STARTOVER_SESSION:{
      var so_remaining=new Date();
      so_remaining.setMinutes(state.session);
      so_remaining.setSeconds(0);
      return{
        session: state.session,
        sessionRemaining: so_remaining,
        formatted: so_remaining.getMinutes()+":00",
        reset:false,
        sessionStarted: false
      }
    }


    default:
      return state;
  }
}

export default sessionTime;
