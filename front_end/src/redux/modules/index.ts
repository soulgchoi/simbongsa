import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import vol from "./vol";

import { penderReducer } from "redux-pender";

export default combineReducers({
  auth,
  user,
  vol,
  pender: penderReducer
});
// export interface StoreState {
//   auth: AuthState;
// }
