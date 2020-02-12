import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import volunteer from "./volunteer"
import vol from "./vol";
import posting from "./posting"
// import temp from "./temp";

import calendar from "./calendar";
import { penderReducer } from "redux-pender";

export default combineReducers({
  calendar,
  auth,
  user,
  volunteer,
  vol,
  // temp,
  posting,
  pender: penderReducer
});
// export interface StoreState {
//   auth: AuthState;
// }
