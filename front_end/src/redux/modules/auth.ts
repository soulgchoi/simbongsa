import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import * as AuthAPI from "lib/api/AuthApi";
import { Record, Map } from "immutable";

// input, form 관련
const CHANGE_INPUT = "auth/CHANGE_INPUT"; // input 값 변경
const INITIALIZE_FORM = "auth/INITIALIZE_FORM"; // form 초기화
const CHECK_FORM = "auth/CHECK_FORM"; // 폼이 제대로 되었는지 체크한다.
// 중복 환인 관련
const CHECK_EMAIL_EXISTS = "auth/CHECK_EMAIL_EXISTS"; // 이메일 중복 확인
const CHECK_USERNAME_EXISTS = "auth/CHECK_USERNAME_EXISTS"; // 아이디 중복 확인
// 가입 로그인 관련
const CHECK_STATUS = "auth/CHECK_STATUS"; // 현재 로그인상태 확인
const LOCAL_REGISTER = "auth/LOCAL_REGISTER"; // 이메일 가입
const LOCAL_LOGIN = "auth/LOCAL_LOGIN"; // 이메일 로그인
const LOGOUT = "auth/LOGOUT"; // 로그아웃
const GOOGLE_LOGIN = "auth/GOOGLE_LOGIN";
const LOGIN_CHECK = "auth/LOGIN_CHECK";

// error 관련
const SET_ERROR = "auth/SET_ERROR";

type CreatePayload = string;
type RemovePayload = number;
type TogglePayload = number;
type ChangeInputPayload = string;
export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);
const EMAIL_VALIDATE = "user/EMAIL_VALIDATE";
export const loginCheck = createAction(LOGIN_CHECK);
export const checkEmailExists = createAction(
  CHECK_EMAIL_EXISTS,
  AuthAPI.checkEmailExists
); // email
export const emailValidate = createAction(
  EMAIL_VALIDATE,
  AuthAPI.emailValidate
);
export const checkUsernameExists = createAction(
  CHECK_USERNAME_EXISTS,
  AuthAPI.checkUsernameExists
); // userid

export const localRegister = createAction(
  LOCAL_REGISTER,
  AuthAPI.localRegister
); // { email, userid, password }
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // { email, password }
export const googleLogin = createAction(GOOGLE_LOGIN, AuthAPI.googleLogin); //
export const logout = createAction(LOGOUT);

export const setError = createAction(SET_ERROR); // { form, message }

export interface AuthState {
  join: {
    form: {
      email: string;
      userid: string;
      password: string;
      passwordConfirm: string;
    };
    exists: {
      email: true;
      password: true;
    };
    error: {
      email: any;
      userid: any;
      password: any;
      passwordConfirm: any;
    };
  };
  login: {
    form: {
      email: string;
      password: string;
    };
    error: {
      email: any;
      password: any;
    };
  };
  result: {};
  loginCheck: boolean;
}

const initialState = Map({
  join: Map({
    form: Map({
      email: "",
      userid: "",
      password: "",
      passwordConfirm: ""
    }),
    exists: Map({
      email: false,
      password: false
    }),
    error: Map({
      email: null,
      userid: null,
      password: null,
      passwordConfirm: null
    })
  }),
  login: Map({
    form: Map({
      email: "",
      password: ""
    }),
    error: Map({
      email: null,
      password: null
    })
  }),
  result: Map({}),
  loginCheck: true
});

export default handleActions<any>(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { form, id, value } = action.payload;
      return state.setIn([form, "form", id], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState.get(action.payload);
      return state.set(action.payload, initialForm);
    },
    [SET_ERROR]: (state, action) => {
      const { form, message, name } = action.payload;
      return state.setIn([form, "error", name], message);
    },
    [LOGIN_CHECK]: (state, action) => {
      return state.set("loginCheck", action.payload);
    },
    ...pender({
      type: CHECK_STATUS,
      onSuccess: (state, action) =>
        state
          .set("loggedInfo", Map(action.payload.data))
          .set("validated", true),
      onFailure: (state, action) => initialState
    }),
    ...pender({
      type: EMAIL_VALIDATE,
      onSuccess: (state, action) => {
        console.log(action);
        return state.set("emailValidate", action.payload.data);
      }
    }),
    ...pender({
      type: CHECK_EMAIL_EXISTS,
      onSuccess: (state, action) => {
        const { data } = action.payload.data;
        return state.setIn(["join", "exists", "email"], data);
      }
    }),
    ...pender({
      type: CHECK_USERNAME_EXISTS,
      onSuccess: (state, action) => {
        return state.setIn(
          ["join", "exists", "userid"],
          action.payload.data.data
        );
      }
    }),
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state, action) => {
        console.log(action.payload.data.token);
        return state.set("result", Map(action.payload.data));
      }
    }),
    ...pender({
      type: GOOGLE_LOGIN,
      onSuccess: (state, action) => {
        console.log("구글 로그인 result", action.payload.data);
        return state.set("result", Map(action.payload.data));
      }
    }),
    ...pender({
      type: LOCAL_REGISTER,
      onSuccess: (state, action) => {
        return state.set("result", Map(action.payload.data));
      }
    })
  },
  initialState
);
