import { INCREASE_BREAK, DECREASE_BREAK, START_SESSION,INCREASE_SESSION, DECREASE_SESSION, RESET_SESSION, RESET_BREAK, REDUCE_SESSION } from "./actionTypes";

export const increaseBreak = () => ({
  type: INCREASE_BREAK
});

export const decreaseBreak = () => ({
  type: DECREASE_BREAK
});

export const increaseSession = () => ({
    type: INCREASE_SESSION
  });
  
export const decreaseSession = () => ({
    type: DECREASE_SESSION
  });

export const resetBreak = () => ({
    type: RESET_BREAK
  });

export const resetSession = () => ({
    type: RESET_SESSION
  });

export const reduceSession = () => ({
    type: REDUCE_SESSION
  });

  export const startSession = () => ({
    type: START_SESSION
  });