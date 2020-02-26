import { createAction, handleActions } from "redux-actions";
import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender/lib/utils";
import * as PostingApi from "lib/api/PostingApi";

enum VolTab{
    List,
    Map,
    Calendar
}
enum UserPageTab{
    Volunteer,
    Post,
    Statistics
}
const SET_CURRENT_TAB = "page/SET_CURRENT_TAB";
const SET_CURRENT_MAP_INFO = "page/SET_CURRENT_MAP_INFO"
const SET_VOL_LIST_FOR_MAP = "page/SET_VOL_LIST_FOR_MAP";
export const setCurrentTab = createAction(SET_CURRENT_TAB);
export const setCurrentMapInfo = createAction(SET_CURRENT_MAP_INFO);
export const setVolListForMap = createAction(SET_VOL_LIST_FOR_MAP);
const initialState = Map({
    currentTab : 0,
    currentMapInfo : Map({
        location : {y : 0, x : 0},
        level : 14,
    }),
    volListForMap : List([])
});

export default handleActions<any>(
  {
    [SET_CURRENT_TAB] : (state, action) =>{
        return state.set("currentTab", action.payload);
    },
    [SET_CURRENT_MAP_INFO] : (state, action) =>{
        console.log("셋맵페이로드", action.payload);
        const { y, x, level } = action.payload;
        const data = { location : { y : y, x : x}, level : level};
        return state.set("currentMapInfo", Map(data));
    },
    [SET_VOL_LIST_FOR_MAP] : (state, action) =>{
        return state.set("volListForMap", List(action.payload));
    },
  },
  initialState
);
