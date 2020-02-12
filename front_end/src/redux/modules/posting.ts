import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable'
import { pender } from 'redux-pender/lib/utils';
import * as PostingApi from 'lib/api/PostingApi';
const INITIALIZE_FORM = "posting/INITIALIZE_FORM"
const CHANGE_INPUT = 'posting/CHANGE_INPUT';
const POST_POSTING = 'posting/POST_POSTING';
const GET_POSTING = 'posting/GET_POSTING';
const POST_REVIEW = 'posting/POST_REVIEW';

export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);
export const postPosting = createAction(POST_POSTING, PostingApi.postPosting)

export interface PostingState {
    posting: {
        form: {
            // selectedFiles: FileList;
            p_content: string;
            v_id: number;
            p_status: number;  // 1은 모집글, 2는 후기글
        };
    };
    result: {};
}

const initialState = Map({
    posting: Map({
        form: Map({
            // selectedFiles: null,
            p_content: "",
            v_id: null,
            p_status: null
        })
    }),
    result: Map({})
})

export default handleActions<any>(
    {
        [INITIALIZE_FORM]: (state, action) => {
            const initialForm = initialState.get(action.payload);
            return state.set(action.payload, initialForm);
          },
        [CHANGE_INPUT]: (state, action) => {
            const { form, id, value } = action.payload;
            return state.setIn(["posting", "form", id], value);
        },
        ...pender({
            type: POST_POSTING,
            onSuccess: (state, action) =>
                state.set("result", action.payload.data)
        })
    },
    initialState
);