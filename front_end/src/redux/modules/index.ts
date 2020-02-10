import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import vol from "./vol";
// import temp from "./temp";

import calendar from "./calendar";
import { penderReducer } from "redux-pender";

export default combineReducers({
  calendar,
  auth,
  user,
  vol,
  // temp,
  pender: penderReducer
});
// export interface StoreState {
//   auth: AuthState;
// }
