import React from 'react';
import { RouteComponentProps, Route } from 'react-router-dom'
import axios from 'axios'

import "assets/css/style.scss";
import "assets/css/user.scss";
import "assets/mycss/components.scss";
import "assets/css/common.scss";
import "assets/css/components.css";
import "assets/css/components.scss";
import "assets/mycss/mainpage.scss";

interface MatchParams {
    v_id: string;
}

class VolDetail extends React.Component<RouteComponentProps<MatchParams>, {}>{
    state = {
        v_id: this.props.history.location.state,
        v_title: "",
        v_organ: "",
        v_pBgnD: "",
        v_pEndD: "",
        v_mBgnD: "",
        v_mEndD: "",
        v_pStatus: 0,
        v_location: "",
        v_adult: "",
        v_young: "",
        v_url: "",
        v_bgnTm: "",
        v_endTm: "",
        v_day: "",
        v_wantednum: 0,
        v_appnow: 0,
        v_wantedtype: "",
        v_detail: "",
        r_id: "",
        ca_id: "",
        v_Auth: "",
        url: "http://70.12.247.126:8080/vol/detail/"
    }

    componentWillMount(){
        axios.get(this.state.url + this.state.v_id)
        .then(response => {
            const data = response.data.data
            console.log(response.data.data)
            this.setState({
                v_title: data.v_title,
                v_organ: data.v_organ,
                v_pBgnD: data.v_pBgnD,
                v_pEndD: data.v_pEndD,
                v_mBgnD: data.v_mBgnD,
                v_mEndD: data.v_mEndD,
                v_pStatus: data.v_pStatus,
                v_location: data.v_location,
                v_adult: data.v_adult,
                v_young: data.v_young,
                v_url: data.v_url,
                v_bgnTm: data.v_bgnTm,
                v_endTm: data.v_endTm,
                v_day: data.v_day,
                v_wantednum: data.v_wantednum,
                v_appnow: data.v_appnow,
                v_wantedtype: data.v_wantedtype,
                v_detail: data.v_detail,
                r_id: data.r_id,
                ca_id: data.ca_id,
                v_Auth: data.v_Auth,
            })
        })
        .catch(err =>
            console.log(err))
    }

    render() {
        return (
            <div>
                <p>{this.state.v_title}</p>
                <p>{this.state.v_location}</p>
            </div>
        );
    }
}

export default VolDetail;