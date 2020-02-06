import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender"; // aixos 응답 이후 작업을 할때 pender 사용
import { Record, Map, List } from "immutable"; // json 형태의 객체 -> Map으로 만들어 immutable 속성 유지
import * as VolApi from "lib/api/VolApi";
import { number } from "prop-types";

type CreatePayload = string;
type RemovePayload = number;
type TogglePayload = number;
type ChangeInputPayload = string;

// 가장 아래 있는 handleActions와 연결해줌
const GET_VOL_BY_ID = "vol/GET_VOL_BY_ID"; // v_id로 봉사정보 가져오기
const GET_VOL_LIST = "vol/GET_VOL_LIST";
const RESET_SELECTED_VOL = "vol/RESET_SELECTED_VOL";
const SET_INIT_LOCATION = "vol/SET_INIT_LOCATION";

export const getVolById = createAction(GET_VOL_BY_ID, VolApi.getVolById);
export const resetSelectedVol = createAction(RESET_SELECTED_VOL);
export const getVolList = createAction(GET_VOL_LIST, VolApi.getVolList); // 이후 list 받는 api로 수정해야함
export const setInitLocation = createAction(SET_INIT_LOCATION);
export interface volState {
  volunteers: [];
  initLocation: {};
  selectedVolunteer: {};
}

const initialState = Map({
  volunteers: [],
  initLocation: { y: 37.5668260054857, x: 126.978656785931 }, // 우선 서울 위치로 초기화 했는데 사용자 정보를 받아오면 사용자 정보로 초기화 합시다.
  selectedVolunteer: Map({})
});

export default handleActions<any>(
  {
    [SET_INIT_LOCATION]: (state, action) => {
      // console.log("store initLocation 초기화", action.payload);
      return state
        .setIn(["initLocation", "y"], action.payload.y)
        .setIn(["initLocation", "x"], action.payload.x);
    },
    [RESET_SELECTED_VOL]: state => {
      return state.setIn(["selectedVolunteer", "v_id"], null);
    },
    ...pender({
      type: GET_VOL_BY_ID,
      onSuccess: (state, action) => {
        const { data } = action.payload.data;
        // console.log("vos.ts의 selectedVolunteer", data);
        // console.log("vol.ts 의 state", state.toJS());
        return state.set("selectedVolunteer", Map(data));
      }
    }),
    ...pender({
      type: GET_VOL_LIST,
      onSuccess: (state, action) => {
        const { data } = action.payload.data;
        console.log("vos.ts의 data", data);
        // console.log("vol.ts 의 state", state.toJS());
        // let temp = List([data]);
        // console.log("temp", temp);
        return state.set("volunteers", data);
      }
    })
  },
  initialState
);
