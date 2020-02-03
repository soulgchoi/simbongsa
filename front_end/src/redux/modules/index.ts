import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import calendar from "./calendar"
import { penderReducer } from "redux-pender";

export default combineReducers({
  calendar,
  auth,
  user,
  pender: penderReducer
});
// export interface StoreState {
//   auth: AuthState;
// }
