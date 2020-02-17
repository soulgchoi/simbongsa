import React from "react";
import CertLabel from "components/label/CertLabel"
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postingActions from "redux/modules/posting";
import { Link } from 'react-router-dom'
import * as VolApi from 'lib/api/VolApi';
import PostingList from "containers/posting/PostingList"
import PostingButton from 'components/button/PostingButton'

interface Props {
}
interface State {
    volunteer: any
}

class VolDetail extends React.Component<any, any>{
    state = {
        volunteer: {
            v_id: "1",
            v_Auth: null,
            v_pStatus: null,
            v_title: null,
            v_mBgnD: null,
            v_mEndD: null,
            v_pBgnD: null,
            v_pEndD: null,
            v_bgnTm: null,
            v_endTm: null,
            v_wanted: null,
            v_actWkdy: null,
            v_adult: null,
            v_young: null,
            v_organ: null,
            v_location: null,
            v_target: null
        }
    };

    shouldComponentUpdate() {
        const { volunteer } = this.state;
        const v_id = this.props.match.params.id
        let result = VolApi.getVolDetail(v_id);
        if (typeof result === "object") { // axios를 잘 리턴한 경우
            result.then(response => {
                console.log("디테일쪽 response", response);
                this.setState({ volunteer: response });
            }
            )
        }
        // return 값이 true인 경우에만 컴포넌트 업데이트
        return volunteer.v_title !== null;
    }

    render() {
        const { volunteer } = this.state;
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
                    <Link
                        to={{
                            pathname: `/${volunteer.v_id}/list`,
                        }}
                    >
                        게시글 보러가기</Link>
                    {/* <PostingList v_id={volunteer.v_id}>{volunteer.v_id}</PostingList> */}
                </div>
            </div>
        );
    }
}

export default connect(
    (state: any) => ({
        posts: state.posting.get("posts")

    }),
    dispatch => ({
        PostingActions: bindActionCreators(postingActions, dispatch)

    })
)(VolDetail);
