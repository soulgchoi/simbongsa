import { createAction, handleActions } from "redux-actions";
import moment, { Moment as MomentTypes } from "moment";
import produce from "immer";
import { act } from "react-dom/test-utils";
import { List } from "immutable"
const DATE_CHANGE = "calendar/DATE_CHANGE";
const TOGGLE_CHANGE = "calendar/TOGGLE_CHANGE";


export const changeDate = createAction(DATE_CHANGE);
export const changeToggle = createAction(TOGGLE_CHANGE)

export interface CalendarState {
  date: MomentTypes;
  toggle: boolean;
}
const initialState: CalendarState = {
  date: moment(),
  toggle: false,

};

export default handleActions<any>(
  {
    [DATE_CHANGE]: (state, action: any) => {
      console.log("날짜 바꾸기", action)
      return produce(state, draft => {
        draft.date = action.payload;
      });
    },
    [TOGGLE_CHANGE]: (state, action: any) => {
      return produce(state, draft => {
        draft.toggle = action.payload
      })
    },
  },
  initialState
);

