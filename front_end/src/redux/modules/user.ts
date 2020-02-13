import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import * as UserAPI from "lib/api/UserApi";
import { pender } from "redux-pender";
import * as userActions from 'redux/modules/user';

const SET_LOGGED_INFO = "user/SET_LOGGED_INFO"; // 로그인 정보 설정
const SET_VALIDATED = "user/SET_VALIDATED"; // validated 값 설정
const LOGOUT = "user/LOGOUT"; // 로그아웃
const CHECK_STATUS = "user/CHECK_STATUS"; // 현재 로그인상태 확인
const SET_PREFER_INFO = "user/SET_PREFER_INFO" // 큐레이션 설정 불러오기
export const setLoggedInfo = createAction(SET_LOGGED_INFO); // loggedInfo
export const setValidated = createAction(SET_VALIDATED); // validated
export const logout = createAction(LOGOUT, UserAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, UserAPI.checkStatus);
export const setPreferInfo = createAction(SET_PREFER_INFO, UserAPI.localPreferInfo);
interface initialStateParams {
  setIn: any;
  set: any;
  loggedInfo: {
    // 현재 로그인중인 유저의 정보
    thumbnail: null;
    username: null;
  };
  logged: false; // 현재 로그인중인지 알려준다
  validated: false; // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미
}
const initialState = Map({
  loggedInfo: Map({
    // 현재 로그인중인 유저의 정보
    email: "",
    userId: "",
    preferInfo: Map({
      bgnTm: "",
      endTm: "",
      age: "",
      preferRegion: [],
      preferCategory: []
    })
  }),
  logged: false, // 현재 로그인중인지 알려준다
  validated: false // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미
});

export default handleActions<any>(
  {
    [SET_LOGGED_INFO]: (state, action) => {
      console.log("SET_LOGGED", action.payload)
      const { sub, aud, iss } = action.payload
      console.log("email", sub)
      return state.setIn(['loggedInfo', 'email'], sub).setIn(['loggedInfo', 'userId'], iss)
    },
    [SET_VALIDATED]: (state, action) => state.set("validated", action.payload),
    ...pender({
      type: CHECK_STATUS,
      onSuccess: (state, action) =>
        state
          .set("loggedInfo", Map(action.payload.data))
          .set("validated", true),
      onFailure: (state, action) => initialState
    }),
    ...pender({
      type: SET_PREFER_INFO,

      onSuccess: (state, action) => {
        console.log("SET_PREFER_INFO", action.payload)
        return state.setIn(["loggedInfo", "preferInfo"], Map(action.payload.data))
      }
    })
  },
  initialState
);
