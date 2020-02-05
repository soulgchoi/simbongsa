
import { createAction, handleActions } from 'redux-actions';
import moment, { Moment as MomentTypes } from 'moment';
import produce from "immer"
import { act } from 'react-dom/test-utils';

const DATE_CHANGE = 'calendar/DATE_CHANGE';
export const changeDate = createAction(DATE_CHANGE);


export interface CalendarState {
    date: MomentTypes
    toggle: boolean
}
const initialState: CalendarState = {
    date: moment(),
    toggle: false
}


export default handleActions({
    [DATE_CHANGE]: (state, action: any) => {
        console.log("payload", action.payload)
        return produce(state, draft => {
            draft.date = action.payload.date
            draft.toggle = action.payload.toggle
        })
    }
}, initialState)