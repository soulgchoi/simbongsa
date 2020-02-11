import React from "react";
import PostingButton from 'components/button/PostingButton'

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/volunteer";


class VolDetail extends React.Component<any, any>{

    componentDidMount() {
        const { VolActions } = this.props;
        const { volunteer } = this.props;
        if (volunteer.v_id != null) {
            VolActions.getVolDetail(volunteer.v_id);
        } else {
            VolActions.getVolDetail(this.props.match.params.id)
        }
    }

    render() {
        const {volunteer} = this.props;
        console.log(volunteer)
        return (
            <div className="">
                <h3 className="">
                    {volunteer.v_title}
                </h3>
                <table className="">
                    <tbody>
                    <tr>
                        <td>모집기간</td>
                        <td>{volunteer.v_mBgnD} ~ {volunteer.v_mEndD}</td>
                    </tr>
                    <tr>
                        <td>봉사기간</td>
                        <td>{volunteer.v_pBgnD} ~ {volunteer.v_pEndD}</td>
                    </tr>
                    <tr>
                        <td>봉사시간</td>
                        <td>{volunteer.v_bgnTm} ~ {volunteer.v_endTm}</td>
                    </tr>
                    <tr>
                        <td>모집인원</td>
                        <td>{volunteer.v_wanted}</td>
                    </tr>
                    <tr>
                        <td>활동요일</td>
                        <td>{volunteer.v_actWkdy}</td>
                    </tr>
                    <tr>
                        <td>봉사분야</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>봉사자유형</td>
                        <td>{volunteer.v_adult === "Y"? "성인" : null} {volunteer.v_young === "Y"? "청소년": null}</td>
                    </tr>
                    <tr>
                        <td>모집기관</td>
                        <td>{volunteer.v_organ}</td>
                    </tr>
                    <tr>
                        <td>봉사장소</td>
                        <td>{volunteer.v_location}</td>
                    </tr>
                    <tr>
                        <td>봉사대상</td>
                        <td>{volunteer.v_target}</td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td>{volunteer.v_location}</td>
                    </tr>
                    </tbody>
                </table>
                <PostingButton 
                    v_id={volunteer.v_id}
                />
            </div>
        );
    }
}

export default connect(
    (state: any) => ({
        volunteers: state.volunteer.get("volunteers"),
        volunteer: state.volunteer.get("volunteer")
    }),
    dispatch => ({
        VolActions: bindActionCreators(volActions, dispatch)
    })
)(VolDetail);