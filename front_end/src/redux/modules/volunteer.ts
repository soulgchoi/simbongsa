import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable'
import { pender } from 'redux-pender/lib/utils';
import * as VolApi from 'lib/api/VolunteerApi'

const GET_VOL_LIST = 'volunteer/GET_VOL_LIST';
const APPEND_VOL_LIST = 'volunteer/APPEND_VOL_LIST';
const GET_VOL_DETAIL = 'volunteer/GET_VOL_DETAIL';
const RESET_SELECTED_VOL = 'volunteer/RESET_SELECTED_VOL';
const SELECT_VOL = 'volunteer/SELECT_VOL';

export const getInitailList = createAction(GET_VOL_LIST, VolApi.getVolList);
export const appendList = createAction(APPEND_VOL_LIST, VolApi.getVolList);
export const getVolDetail = createAction(GET_VOL_DETAIL, VolApi.getVolDetail);
export const resetSelectedVol = createAction(RESET_SELECTED_VOL);
export const selectVol = createAction(SELECT_VOL);

export interface VolState {
    volunteers: List<any>;
    volunteer: Object;
}


const initialState = Map({
    volunteers: List(),
    volunteer: { 'v_id': null },
})


export default handleActions<any>(
    {   
        [SELECT_VOL]: (state, action) => {
            return state.setIn(["volunteer", 'v_id'], action.payload)
        },
        [RESET_SELECTED_VOL]: (state) => {
            return state.setIn(["volunteer", 'v_id'], null);
        },
        ...pender({
            type: GET_VOL_LIST,
            onSuccess: (state, action) =>
                state.set("volunteers", action.payload.data.data)
        }),
        ...pender({
            type: APPEND_VOL_LIST,
            onSuccess: (state, action) => {
                const volunteers = state.get("volunteers");
                return state.set("volunteers", volunteers.concat(action.payload.data.data))
            }
        }),
        ...pender({
            type: GET_VOL_DETAIL,
            onSuccess: (state, action) => 
                state.set("volunteer", action.payload.data.data)
        })
    },
    initialState
);