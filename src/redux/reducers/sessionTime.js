import { INCREASE_SESSION, DECREASE_SESSION, RESET_SESSION, REDUCE_SESSION } from "../actionTypes";
import moment from 'moment';

const initialState = {
  session: 25,
  sessionRemaining:25
};

const sessionTime = (state = initialState, action) =>{
  switch (action.type) {
    case INCREASE_SESSION: {
      if(state.session===60){
        return{
          session: state.session
        }
      }
      else{
        return {
          session: state.session+1
        }
      }
    }
    case DECREASE_SESSION: {
      if(state.session === 1){
          return {session: state.session}
      }
      else{
        return {
            session: state.session-1
          };
      }
    }
    case RESET_SESSION:{
      return {session:25}
    }
    case REDUCE_SESSION:{
      var remaining = new Date();
      remaining.setMinutes(state.sessionRemaining);
      remaining.setSeconds(0);
      console.log(remaining.getMinutes())

      var newremainder = new Date(remaining);
      newremainder.setSeconds(remaining.getSeconds()-1);
      console.log(newremainder.getMinutes() + ":"+newremainder.getSeconds());
    }
    default:
      return state;
  }
}

export default sessionTime;
