import React from 'react';
import { RouteComponentProps, Route } from 'react-router-dom'
import axios from 'axios'

// import "assets/css/style.scss";
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";

interface IProps {
    selectedVolunteer: any;
}

class VolDetail extends React.Component<IProps, {}>{
    componentWillUnmount() {
        const { selectedVolunteer } = this.props;
        // TODO : selectedVolunteer 의 좌표(y,x)를 store의 currentLocation에 저장하기
    }
    render() {
        const { selectedVolunteer } = this.props;
        return (
            <div className="">
                <h3 className="">
                    {selectedVolunteer.v_title}
                </h3>
                <table className="">
                    <tbody>
                        <tr>
                            <td>봉사기간</td>
                            <td>{selectedVolunteer.v_pBgnD.replace(/-/g, '.')} ~ {selectedVolunteer.v_pEndD.replace(/-/g, '.')}</td>
                        </tr>
                        <tr>
                            <td>봉사시간</td>
                            <td>{selectedVolunteer.v_bgnTm.slice(0, 5)} ~ {selectedVolunteer.v_endTm.slice(0, 5)}</td>
                        </tr>
                        <tr>
                            <td>모집기간</td>
                            <td>{selectedVolunteer.v_mBgnD.replace(/-/g, '.')} ~ {selectedVolunteer.v_mEndD.replace(/-/g, '.')}</td>
                        </tr>
                        <tr>
                            <td>모집인원</td>
                            <td>{selectedVolunteer.v_wanted}</td>
                        </tr>
                        <tr>
                            <td>활동요일</td>
                            <td>{selectedVolunteer.v_actWkdy.replace(/,/g, ', ')}</td>
                        </tr>
                        <tr>
                            <td>봉사분야</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>봉사자유형</td>
                            <td>{selectedVolunteer.v_adult === "Y" ? "성인" : null} {selectedVolunteer.v_young === "Y" ? "청소년" : null}</td>
                        </tr>
                        <tr>
                            <td>모집기관</td>
                            <td>{selectedVolunteer.v_organ}</td>
                        </tr>
                        <tr>
                            <td>등록기관</td>
                            <td>{selectedVolunteer.v_organ}</td>
                        </tr>
                        <tr>
                            <td>봉사장소</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>봉사대상</td>
                            <td>{selectedVolunteer.v_target}</td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td>{selectedVolunteer.v_location}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    ({ vol }: any) => {
        return { selectedVolunteer: vol.get("selectedVolunteer") }
    },
    dispatch => ({
        VolActions: bindActionCreators(volActions, dispatch)
    })
)(VolDetail);