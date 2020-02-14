import React from "react";
import PostingButton from 'components/button/PostingButton'
import CertLabel from "components/label/CertLabel"
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/volunteer";
import * as postingActions from "redux/modules/posting";

import Vol from "./Vol";
import vol from "redux/modules/vol";
import PostingList from "../posting/PostingList"

class VolDetail extends React.Component<any, any>{

    componentWillMount() {
        const { VolActions } = this.props;
        console.log(this.props)
        const v_id = this.props.match.params.id
        VolActions.selectVol(v_id)
        VolActions.getVolDetail(v_id)

        const { PostingActions } = this.props;
        const p_id = 1
        PostingActions.getPostbyID(p_id)
        const { posts } = this.props;
        console.log(posts)
    }

    render() {
        const { VolActions, volunteer, posts } = this.props;
        console.log(volunteer)
        console.log(posts)
        // const myVol = this.props.history.location.state
        // console.log(myVol)
        return (
            <div>                
                <CertLabel
                    v_Auth={volunteer.v_Auth}
                    v_pStatus={volunteer.v_pStatus}
                />

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
                            <td>{volunteer.v_adult === "Y" ? "성인" : null} {volunteer.v_young === "Y" ? "청소년" : null}</td>
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
                <div>포스팅들, {volunteer.v_id}
                <PostingList v_id={volunteer.v_id}>{volunteer.v_id}</PostingList>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: any) => ({
        volunteers: state.volunteer.get("volunteers"),
        volunteer: state.volunteer.get("volunteer"),
        posts: state.posting.get("posts")

    }),
    dispatch => ({
        VolActions: bindActionCreators(volActions, dispatch),
        PostingActions: bindActionCreators(postingActions, dispatch)

    })
)(VolDetail);
