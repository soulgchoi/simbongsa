import { createAction, handleActions } from "redux-actions";

import { Map, List } from "immutable";
import * as UserAPI from "lib/api/UserApi";
import { pender } from "redux-pender";

const SET_LOGGED_INFO = "user/SET_LOGGED_INFO"; // 로그인 정보 설정
const SET_VALIDATED = "user/SET_VALIDATED"; // validated 값 설정
const LOGOUT = "user/LOGOUT"; // 로그아웃
const CHECK_STATUS = "user/CHECK_STATUS"; // 현재 로그인상태 확인

const GET_USER_FOLLOWER = "user/GET_USER_FOLLOWER"; //
const GET_USER_FOLLOWEE = "user/GET_USER_FOLLOWEE";
const SET_USER_ID = "user/SET_USER_ID";

export const setLoggedInfo = createAction(SET_LOGGED_INFO); // loggedInfo
export const setValidated = createAction(SET_VALIDATED); // validated
export const logout = createAction(LOGOUT, UserAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, UserAPI.checkStatus);

export const setUserId = createAction(SET_USER_ID);
export const setUserFollower = createAction(
  GET_USER_FOLLOWER,
  UserAPI.getUserFollower
);
export const setUserFollowee = createAction(
  GET_USER_FOLLOWEE,
  UserAPI.getUserFollowee
);

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
    username: null,
    userId: null
  }),
  userProfile: Map({
    userId: null,
    followerList: List([]),
    followingList: List([])
  }),
  logged: false, // 현재 로그인중인지 알려준다
  validated: false // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미
});

export default handleActions<any>(
  {
    [SET_LOGGED_INFO]: (state, action) => {
      const { sub, aud } = action.payload;
      console.log("sub, aud", action);
      // console.log("=================SET_LOGGED", sub, aud);
      return state
        .set("logged", true)
        .setIn(["loggedInfo"], Map({ username: sub, userId: aud }));
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

    [SET_USER_ID]: (state, action) =>
      state.setIn(["userPforile", "ueserId"], action.payload),

    ...pender({
      type: GET_USER_FOLLOWER,
      onSuccess: (state, action) => {
        state.setIn(["userProfile", "followerList"], List(action.payload));
      }
    }),
    ...pender({
      type: GET_USER_FOLLOWEE,
      onSuccess: (state, action) => {
        state.setIn(["userProfile", "followeeList"], List(action.payload));
      }
    })
  },
  initialState
);
