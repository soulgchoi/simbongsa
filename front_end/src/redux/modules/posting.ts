import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable'
import { pender } from 'redux-pender/lib/utils';
import * as PostingApi from 'lib/api/PostingApi';
const INITIALIZE_FORM = "posting/INITIALIZE_FORM"
const CHANGE_INPUT = 'posting/CHANGE_INPUT';
const CHANGE_FILE_INPUT = 'posting/CHANGE_FILE_INPUT'
const CHANGE_STATUS = 'posting/CHANGE_STATUS'
const POST_POSTING = 'posting/POST_POSTING';
const GET_POSTING = 'posting/GET_POSTING';
const POST_REVIEW = 'posting/POST_REVIEW';

export const changeInput = createAction(CHANGE_INPUT);
export const changeFileInput = createAction(CHANGE_FILE_INPUT);
export const changeStatus = createAction(CHANGE_STATUS);
export const initializeForm = createAction(INITIALIZE_FORM);
export const postPosting = createAction(POST_POSTING, PostingApi.postPosting)
export const getPostbyID = createAction(GET_POSTING, PostingApi.getPosts)

export interface PostingState {
    posting: {
        form: {
            p_content: string;
            v_id: number;
            p_status: number;  // 1은 모집글, 2는 후기글
            m_id: number;
        };
    };
    result: {};
    selectedfiles: List<any>;
    posts: object,
    // posts: {
    //     uris: List<any>,
    //     post: {
    //         v_id: number;
    //         p_content: string;
    //         m_id: number;
    //         p_status: number;
    //     }
    // };
}

const initialState = Map({
    posting: Map({
        form: Map({
            p_content: "",
            v_id: 1,
            p_status: 0,
            m_id: 1
        })
    }),
    selectedfiles: [],
    result: Map({}),
    // posts: {
    //     uris: [],
    //     post: {
    //         v_id: null,
    //         p_content: null,
    //         m_id: null,
    //         p_status: null,
    //     }
    // }
    posts: {}
})

export default handleActions<any>(
    {
        [INITIALIZE_FORM]: (state, action) => {
            const initialForm = initialState.get(action.payload);
            return state.set(action.payload, initialForm);
        },
        [CHANGE_INPUT]: (state, action) => {
            const { form, id, value } = action.payload;
            console.log("action: ", value)
            return state.setIn(["posting", "form", id], value);
        },
        [CHANGE_FILE_INPUT]: (state, action) => {
            const files = state.get("selectedfiles");
            console.log(files)
            return state.set("selectedfiles", files.concat(action.payload))
        },
        ...pender({
            type: POST_POSTING,
            onSuccess: (state, action) =>
                state.set("result", action.payload.data)
        }),
        ...pender({
            type: GET_POSTING,
            onSuccess: (state, action) => {
                state.set("posts", action.payload.data)
                console.log(action.payload.data)
                console.log("posts")
            }
        })
    },
    initialState
);