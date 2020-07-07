import { combineReducers } from "redux";
import sessionTime from "./sessionTime";
import breakTime from "./breakTime";

export default combineReducers({ breakTime, sessionTime });
