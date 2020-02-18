import { createAction, handleActions } from "redux-actions";

import { Map, List } from "immutable";
import * as UserAPI from "lib/api/UserApi";
import { pender } from "redux-pender";
import * as userActions from "redux/modules/user";

const SET_LOGGED_INFO = "user/SET_LOGGED_INFO"; // 로그인 정보 설정
const SET_VALIDATED = "user/SET_VALIDATED"; // validated 값 설정
const SET_PREFER_INFO = "user/SET_PREFER_INFO"; // 큐레이션 설정 불러오기
const CHANGE_LOADING = "user/CHANGE_LOADING" // loading 설정
const GET_FEED_LIST = "user/GET_FEED_LIST"; // 유저의 피드 리스트 가져오기
const APPEND_FEED_LIST = "volunteer/APPEND_FEED_LIST";

// const GET_USER_FOLLOWER = "user/GET_USER_FOLLOWER"; //
// const GET_USER_FOLLOWEE = "user/GET_USER_FOLLOWEE";
// const SET_USER_ID = "user/SET_USER_ID";

export const setLoggedInfo = createAction(SET_LOGGED_INFO); // loggedInfo
export const setValidated = createAction(SET_VALIDATED); // validated
export const setPreferInfo = createAction(
  SET_PREFER_INFO,
  UserAPI.localPreferInfo
);
export const changeLoading = createAction(CHANGE_LOADING)

export const getFeedList = createAction(GET_FEED_LIST, UserAPI.getFeedList);
// export const setUserId = createAction(SET_USER_ID);
// export const setUserFollower = createAction(
//   GET_USER_FOLLOWER,
//   UserAPI.getUserFollower
// );
// export const setUserFollowee = createAction(
//   GET_USER_FOLLOWEE,
//   UserAPI.getUserFollower
// );

interface initialStateParams {
  setIn: any;
  set: any;
  loggedInfo: {
    // 현재 로그인중인 유저의 정보
    thumbnail: string;
    username: string;
  };
  logged: boolean; // 현재 로그인중인지 알려준다
  validated: boolean; // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미
  emailValidate: boolean;
  loading: boolean;
  feedList: List<any>;
}
const initialState = Map({
  loggedInfo: Map({
    // 현재 로그인중인 유저의 정보
    email: "",
    userId: "",
    m_id: "",
    preferInfo: Map({
      bgnTm: "",
      endTm: "",
      age: "",
      preferRegion: [],
      preferCategory: []
    })
  }),
  // userProfile: Map({
  //   userId: null,
  //   followerList: List([]),
  //   followingList: List([])
  // }),
  logged: false, // 현재 로그인중인지 알려준다
  validated: false, // 이 값은 현재 로그인중인지 아닌지 한번 서버측에 검증했음을 의미
  emailValidate: false,
  loading: false,
  feedList: List([])
});

export default handleActions<any>(
  {
    [SET_LOGGED_INFO]: (state, action) => {
      const { sub, aud, iss } = action.payload;
      console.log("sub, iss", action.payload);
      // console.log("=================SET_LOGGED", sub, aud);
      return state
        .set("logged", true)
        .setIn(["loggedInfo"], Map({ username: sub, userId: iss, m_id: aud }));
    },

    [SET_VALIDATED]: (state, action) => state.set("validated", action.payload),
    [CHANGE_LOADING]: (state, action) => {
      console.log("loading 여기 들어오니", action.payload)
      return state.set("loading", action.payload)
    },
    ...pender({
      type: SET_PREFER_INFO,

      onSuccess: (state, action) => {
        console.log("SET_PREFER_INFO", action.payload.data.data);
        const {
          m_bgnTm,
          m_endTm,
          m_age,
          m_prefer_region,
          m_prefer_category
        } = action.payload.data.data;
        let data = Map({
          bgnTm: m_bgnTm,
          endTm: m_endTm,
          age: m_age,
          preferRegion: m_prefer_region,
          preferCategory: m_prefer_category
        });
        return state.setIn(["loggedInfo", "preferInfo"], data);
        // return state.setIn(["loggedInfo", "preferInfo", "bgnTm"], m_bgnTm).setIn(["loggedInfo", "preferInfo", "endTm"], m_endTm).setIn(["loggedInfo", "preferInfo", "age"], m_age).setIn(["loggedInfo", "preferInfo", "preferRegion"], m_prefer_region).setIn(["loggedInfo", "preferInfo", "preferCategory"], m_prefer_category)
      }
    }),
    ...pender({
      type: GET_FEED_LIST,
      onSuccess: (state, action) => {
        console.log("피드리스트 액션", action.data.data);
        return state.set("feedLilst", List(action.data.data));
      }
    })

    // [SET_USER_ID]: (state, action) =>
    //   state.setIn(["userPforile", "ueserId"], action.payload),

    // ...pender({
    //   type: GET_USER_FOLLOWER,
    //   onSuccess: (state, action) => {
    //     state.setIn(["userProfile", "followerList"], List(action.payload));
    //   }
    // }),
    // ...pender({
    //   type: GET_USER_FOLLOWEE,
    //   onSuccess: (state, action) => {
    //     state.setIn(["userProfile", "followeeList"], List(action.payload));
    //   }
    // })
  },
  initialState
);
