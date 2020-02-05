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
const CLICK_VOL = "vol/CLICK_VOL"; // 마커를 클릭했을 때 하단에 봉사정보를 표현해 주는 액션
const GET_VOL_LIST = "vol/GET_VOL_LIST";

export const getVolById = createAction(GET_VOL_BY_ID, VolApi.getVolById);
export const clickVol = createAction(CLICK_VOL);
export const getVolList = createAction(GET_VOL_LIST, VolApi.getVolList); // 이후 list 받는 api로 수정해야함
export interface volState {
  volunteers: {
    id: number;
    status: number;
    many: number;
    bgnTm: number;
    endTm: number;
    location: string;
    adult: number;
    young: number;
    mBgnD: number;
    mEndD: number;
    pBgnD: number;
    pEndD: number;
    title: string;
    url: string;
  }[];
  selectedVolunteer: {
    id: number;
    status: number;
    many: number;
    bgnTm: number;
    endTm: number;
    location: string;
    adult: number;
    young: number;
    mBgnD: number;
    mEndD: number;
    pBgnD: number;
    pEndD: number;
    title: string;
    url: string;
  };
  clickedVolId: number;
}

const initialState = Map({
  volunteers: List([
    Map({
      id: null,
      status: null,
      many: null,
      bgnTm: null,
      endTm: null,
      location: "",
      adult: null,
      young: null,
      mBgnD: null,
      mEndD: null,
      pBgnD: null,
      pEndD: null,
      title: "",
      url: ""
    })
  ]),
  selectedVolunteer: Map({
    id: null,
    status: null,
    many: null,
    bgnTm: null,
    endTm: null,
    location: "",
    adult: null,
    young: null,
    mBgnD: null,
    mEndD: null,
    pBgnD: null,
    pEndD: null,
    title: "",
    url: ""
  }),
  clickedVolId: -1
});

export default handleActions<any>(
  {
    [CLICK_VOL]: (state, action) => {
      const id = action.payload;
      return state.set("clickedVolId", id);
    },
    ...pender({
      type: GET_VOL_BY_ID,
      onSuccess: (state, action) => {
        const { data } = action.payload.data;
        console.log("vos.ts의 selectedVolunteer", data);
        // console.log("vol.ts 의 state", state.toJS());
        return state.set("selectedVolunteers", data);
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
        return state.set("volunteers", List(data));
      }
    })
  },
  initialState
);
