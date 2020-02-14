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
const SET_CURRENT_LOCATION = "vol/SET_CURRENT_LOCATION";
const SET_VOL_MAP = "vol/SET_VOL_MAP";
const SET_SELECTED_MARKER = "vol/SET_SELECTED_MARKER";

export const setVolMap = createAction(SET_VOL_MAP);
export const getVolById = createAction(GET_VOL_BY_ID, VolApi.getVolById);
export const resetSelectedVol = createAction(RESET_SELECTED_VOL);
// export const getVolList = createAction(GET_VOL_LIST, VolApi.getVolList); // 이후 list 받는 api로 수정해야함
export const setCurrentLocation = createAction(SET_CURRENT_LOCATION);
export const setSelectedMarker = createAction(SET_SELECTED_MARKER);

export interface volState {
  volunteers: List<any>;
  currentLocation: { y: number; x: number };
  selectedVolunteer: {};
  selectedMarker: any;
}

const initialState = Map({
  volunteers: List([]),
  currentLocation: { y: 37.5668260054857, x: 126.978656785931 },
  selectedVolunteer: { v_id: null },
  volMap: null,
  selectedMarker: null
});

export default handleActions<any>(
  {
    [SET_VOL_MAP]: (state, action) => {
      return state.set("volMap", action.payload);
    },
    [SET_CURRENT_LOCATION]: (state, action) => {
      return state.set("currentLocation", action.payload);
    },
    [RESET_SELECTED_VOL]: state => {
      return state.setIn(["selectedVolunteer", "v_id"], null);
    },
    [SET_SELECTED_MARKER]: (state, action) => {
      console.log("페이로드: ", action.payload);
      return state.set("selectedMarker", action.payload);
    },
    ...pender({
      type: GET_VOL_BY_ID,
      onSuccess: (state, action) => {
        const { data } = action.payload.data;
        return state.set("selectedVolunteer", data);
      }
    }),
    ...pender({
      type: GET_VOL_LIST,
      onSuccess: (state, action) => {
        const { data } = action.payload.data;
        return state.set("volunteers", List(data));
      }
    })
  },
  initialState
);
