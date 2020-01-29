import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";

import { penderReducer } from "redux-pender";

export default combineReducers({
  auth,
  user,
  pender: penderReducer
});
export interface StoreState {
  auth: AuthState;
  user: UserState;
}
