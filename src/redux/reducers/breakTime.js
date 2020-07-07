import { INCREASE_BREAK, DECREASE_BREAK, RESET_BREAK, REDUCE_BREAK } from "../actionTypes";

const initialState = {
  break: 5,
  breakRemaining: 5
};

//cannot be smaller than 1 or greater than 60
const breakTime = (state = initialState, action) =>{
  switch (action.type) {
    case INCREASE_BREAK: {
      if(state.break===60){
        return {break:state.break}
      }
      else{
        return {
          break: state.break+1
        }
      }
    }
    case DECREASE_BREAK: {
      if(state.break === 1 ){
          return {break: state.break}
      }
      else{
        return {
            break: state.break-1
          };
      }
    }
    case RESET_BREAK:{
      return {break:5};
    }
    default:
      return state;
  }
}

export default breakTime;