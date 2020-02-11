import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
// import vol from "./vol";
import volunteer from "./volunteer"

import calendar from "./calendar";
import { penderReducer } from "redux-pender";

export default combineReducers({
  calendar,
  auth,
  user,
  volunteer,
  pender: penderReducer
});
// export interface StoreState {
//   auth: AuthState;
// }
