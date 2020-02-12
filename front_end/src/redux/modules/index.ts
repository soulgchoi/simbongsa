import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import volunteer from "./volunteer"
import vol from "./vol";
<<<<<<< HEAD
import search from './search';
=======
import base from "./base";
>>>>>>> ffd8aa3b0680cb7f996d48c1637c78205ef5479b
// import temp from "./temp";

import calendar from "./calendar";
import { penderReducer } from "redux-pender";

export default combineReducers({
  calendar,
  auth,
  user,
  volunteer,
  vol,
<<<<<<< HEAD
  search,
  pender: penderReducer,

=======
  // temp,
  base,
  pender: penderReducer
>>>>>>> ffd8aa3b0680cb7f996d48c1637c78205ef5479b
});

