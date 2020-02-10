import { createAction, handleActions } from 'redux-actions';

const GET_FULL_LIST = 'volunteer/GET_FULL_LIST';
const GET_DETAIL = 'volunteer/GET_DETAIL';

export const getFullList = createAction(GET_FULL_LIST);
export const getDetail = createAction(GET_DETAIL);

export interface VolState {
    volunteer: {
        v_id: number;
        v_title: string;
        v_pStatus: number;
        v_Auth: number;
    }
    detail: {
        v_organ: string;
        v_pBgnD: string;
        v_pEndD: string;
        v_mBgnD: string;
        v_mEndD: string;
        v_location: string;
        v_adult: string;
        v_young: string;
        v_url: string;
        v_bgnTm: string;
        v_endTm: string;
        v_actWkdy: string;
        v_wanted: string;
        v_appnow: number;
        v_target: string;
        v_detail: string;
        r_id: string;
        ca_id: string;
    }
}



const initialState: VolState = {
    volunteer: {
        v_id: 0,
        v_title: "",
        v_pStatus: 0,
        v_Auth: 0
    },
    detail: {
            v_organ: "",
        v_pBgnD: "",
        v_pEndD: "",
        v_mBgnD: "",
        v_mEndD: "",
        v_location: "",
        v_adult: "",
        v_young: "",
        v_url: "",
        v_bgnTm: "",
        v_endTm: "",
        v_actWkdy: "",
        v_wanted: "",
        v_appnow: 0,
        v_target: "",
        v_detail: "",
        r_id: "",
        ca_id: ""
        }
}

export default handleActions<any>(
    {
        
    }
)
