import { createAction, handleActions } from "redux-actions";
import moment, { Moment as MomentTypes } from "moment";
import produce from "immer";
import { act } from "react-dom/test-utils";
import { List } from "immutable";
const DATE_CHANGE = "calendar/DATE_CHANGE";
const TOGGLE_CHANGE = "calendar/TOGGLE_CHANGE";

export const changeDate = createAction(DATE_CHANGE);
export const changeToggle = createAction(TOGGLE_CHANGE);

export interface CalendarState {
  date: MomentTypes;
  toggle: boolean;
}
const initialState: CalendarState = {
  date: moment(),
  toggle: false
};

export default handleActions<any>(
  {
    [DATE_CHANGE]: (state, action: any) => {
<<<<<<< HEAD
      console.log("날짜 바꾸기", action)
      return produce(state, (draft:any) => {
=======
      console.log("날짜 바꾸기", action.payload);
      return produce(state, (draft: any) => {
>>>>>>> 840610c3b077bd54dfaab05600487a32dd9146e7
        draft.date = action.payload;
      });
    },
    [TOGGLE_CHANGE]: (state, action: any) => {
<<<<<<< HEAD
      return produce(state, (draft:any) => {
        draft.toggle = action.payload
      })
    },
=======
      return produce(state, (draft: any) => {
        draft.toggle = action.payload;
      });
    }
>>>>>>> 840610c3b077bd54dfaab05600487a32dd9146e7
  },
  initialState
);
