import React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import axios from "axios";

import PostingButton from 'components/button/PostingButton'

// import "assets/css/style.scss";
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";

interface IProps {
  selectedVolunteer: any;
}

class VolDetail extends React.Component<RouteComponentProps<MatchParams>, {}>{
    state = {
        v_id: this.props.history.location.state as string,
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
        v_actWkdy: "",
        v_wanted: "",
        v_appnow: 0,
        v_target: "",
        v_detail: "",
        r_id: "",
        ca_id: "",
        v_Auth: "",
        url: "http://13.124.127.232:8080/A205/vol/detail/",
    }

    componentDidMount(){
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
                v_actWkdy: data.v_actWkdy,
                v_wanted: data.v_wanted,
                v_appnow: data.v_appnow,
                v_target: data.v_target,
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
            <div className="">
                <h3 className="">
                    {this.state.v_title}<br />
                    {this.state.v_id}
                    {typeof (this.state.v_id)}
                </h3>
                <table className="">
                    <tbody>
                    <tr>
                        <td>봉사기간</td>
                        <td>{this.state.v_pBgnD.replace(/-/g, '.')} ~ {this.state.v_pEndD.replace(/-/g, '.')}</td>
                    </tr>
                    <tr>
                        <td>봉사시간</td>
                        <td>{this.state.v_bgnTm.slice(0, 5)} ~ {this.state.v_endTm.slice(0, 5)}</td>
                    </tr>
                    <tr>
                        <td>모집기간</td>
                        <td>{this.state.v_mBgnD.replace(/-/g, '.')} ~ {this.state.v_mEndD.replace(/-/g, '.')}</td>
                    </tr>
                    <tr>
                        <td>모집인원</td>
                        <td>{this.state.v_wanted}</td>
                    </tr>
                    <tr>
                        <td>활동요일</td>
                        <td>{this.state.v_actWkdy.replace(/,/g, ', ')}</td>
                    </tr>
                    <tr>
                        <td>봉사분야</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>봉사자유형</td>
                        <td>{this.state.v_adult === "Y"? "성인" : null} {this.state.v_young === "Y"? "청소년": null}</td>
                    </tr>
                    <tr>
                        <td>모집기관</td>
                        <td>{this.state.v_organ}</td>
                    </tr>
                    <tr>
                        <td>등록기관</td>
                        <td>{this.state.v_organ}</td>
                    </tr>
                    <tr>
                        <td>봉사장소</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>봉사대상</td>
                        <td>{this.state.v_target}</td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td>{this.state.v_location}</td>
                    </tr>
                    </tbody>
                </table>
                <PostingButton 
                    v_id={this.state.v_id}
                />
            </div>
        );
    }
}

export default connect(
  ({ vol }: any) => {
    return { selectedVolunteer: vol.get("selectedVolunteer") };
  },
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(VolDetail);