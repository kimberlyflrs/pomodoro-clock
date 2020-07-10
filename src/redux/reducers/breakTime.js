import { INCREASE_BREAK, DECREASE_BREAK, START_BREAK, RESET_BREAK, REDUCE_BREAK, STARTOVER_BREAK } from "../actionTypes";


var remainingTime = new Date();
remainingTime.setMinutes(5);
remainingTime.setSeconds(0);


const initialState = {
  break: 5,
  breakRemaining: remainingTime,
  formatted: '05:00',
  reset: false,
  breakStarted: false
};

//cannot be smaller than 1 or greater than 60
const breakTime = (state = initialState, action) =>{
  switch (action.type) {
    case INCREASE_BREAK: {
      if(state.break===60){
        var remaining = new Date();
        remaining.setMinutes(60);
        remaining.setSeconds(0);
        return {
          break:state.break,
          breakRemaining:remaining,
          formatted:'60:00',
          reset: false,
          breakStarted:false
        }
      }
      else{
        var remaining = new Date();
        remaining.setMinutes(state.break+1);
        remaining.setSeconds(0);
        if(state.break+1<10){
          return {
            break: state.break+1,
            breakRemaining: remaining,
            formatted: '0'+remaining.getMinutes()+':00',
            reset:false,
            breakStarted:false
          }
        }
        else{
          return {
            break: state.break+1,
            breakRemaining: remaining,
            formatted: remaining.getMinutes()+':00',
            reset:false,
            breakStarted:false
          }
        }
      }
    }



    case DECREASE_BREAK: {
      if(state.break === 1 ){
        var remaining = new Date();
        remaining.setMinutes(1);
        remaining.setSeconds(0);
          return {
            break: state.break,
            breakRemaining:remaining,
            formatted: "01:00",
            reset:false,
            breakStarted: false
          }
      }
      else{
        var remaining = new Date();
        remaining.setMinutes(state.break-1);
        remaining.setSeconds(0);
        if(state.break-1<10){
            return {
              break: state.break-1,
              breakRemaining:remaining,
              formatted: "0"+remaining.getMinutes()+":00",
              reset:false,
              breakStarted: false
            }    
        }
        else{
            return {
              break: state.break-1,
              breakRemaining:remaining,
              formatted: remaining.getMinutes()+":00",
              reset:false,
              breakStarted: false
            }  
        }
      }
    }



    case RESET_BREAK:{
      var remaining = new Date();
      remaining.setMinutes(5);
      remaining.setSeconds(0);
      return {
        break:5,
        breakRemaining: remaining,
        formatted:'05:00',
        reset:true,
        breakStarted:false
      };
    }



    case REDUCE_BREAK:{
      var newRemainder = new Date(state.breakRemaining);
      newRemainder.setSeconds(state.breakRemaining.getSeconds()-1)
      console.log(newRemainder.getMinutes() + ":"+newRemainder.getSeconds());

      var minute;
      var second;
      if (newRemainder.getMinutes()<10){
        minute = "0"+newRemainder.getMinutes();
      }
      else{
        minute=newRemainder.getMinutes();
      }

      if(newRemainder.getSeconds()<10){
        second = ':0'+newRemainder.getSeconds();
      }
      else{
        second= ':'+newRemainder.getSeconds();
      }
      
      return{
        break: state.break,
        breakRemaining: newRemainder,
        formatted: minute+second,
        reset: false,
        breakStarted: true
      }
    }


    case START_BREAK:{
      return{
        break: state.break,
        breakRemaining: state.breakRemaining,
        formatted: state.formatted,
        reset: false,
        breakStarted:!state.breakStarted
      }
    }

    case STARTOVER_BREAK:{
      var so_remaining=new Date();
      so_remaining.setMinutes(state.break);
      so_remaining.setSeconds(0);
      return{
        break: state.break,
        breakRemaining: so_remaining,
        formatted: so_remaining.getMinutes()+":00",
        reset:false,
        breakStarted: false
      }
    }

    default:
      return state;
  }
}

export default breakTime;