import React from "react";
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as postingActions from "redux/modules/posting";
import { Link } from "react-router-dom";
import * as VolApi from "lib/api/VolApi";
import PostingButton from "components/button/PostingButton";
import VolWeekday from "./VolWeekday";

import { Responsive, Table, Button, Container } from "semantic-ui-react";
import "./VolDetail.css";

interface Props { match: any }
interface State {
  volunteer: any;
}

class VolDetail extends React.Component<Props, State> {
  state = {
    volunteer: {
      v_id: "1",
      v_Auth: null,
      v_pStatus: null,
      v_title: null,
      v_mBgnD: null,
      v_mEndD: "",
      v_pBgnD: null,
      v_pEndD: null,
      v_bgnTm: null,
      v_endTm: null,
      v_wanted: 0,
      v_actWkdy: null,
      v_adult: null,
      v_young: null,
      v_organ: null,
      v_location: null,
      v_target: null,
      v_url: null,
      v_appnow: 0,
      v_detail: null
    }
  };

  componentDidMount() {
    const { volunteer } = this.state;
    const v_id = this.props.match.params.id;
    let result = VolApi.getVolDetail(v_id);
    if (typeof result === "object") {
      // axios를 잘 리턴한 경우
      result.then((response: any) => {
        this.setState({ volunteer: response.data.data });
        // console.log(response.data.data);
      });
    }
    // return 값이 true인 경우에만 컴포넌트 업데이트
    return volunteer.v_title !== null;
  }

  render() {
    const { volunteer } = this.state;
    return (
      <Container text>
        <div className="title">{volunteer.v_title}</div>
        <Responsive minWidth={320} maxWidth={2559}>
          <Table unstackable celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell width="5" className="head">
                  모집기간
                </Table.Cell>
                <Table.Cell className="content">
                  {volunteer.v_mBgnD} ~ {volunteer.v_mEndD}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">봉사기간</Table.Cell>
                <Table.Cell className="content">
                  {volunteer.v_pBgnD} ~ {volunteer.v_pEndD}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">봉사시간</Table.Cell>
                <Table.Cell className="content">
                  {volunteer.v_bgnTm} ~ {volunteer.v_endTm}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">모집인원</Table.Cell>
                <Table.Cell className="content">
                  {volunteer.v_wanted} 명 /일
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">현재인원</Table.Cell>
                <Table.Cell className="content">
                  {volunteer.v_appnow} 명
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">활동요일</Table.Cell>
                <Table.Cell className="content">
                  <VolWeekday weekday={this.state.volunteer.v_actWkdy} />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">봉사자유형</Table.Cell>
                <Table.Cell className="content">
                  {volunteer.v_adult === "Y" ? "성인" : null}{" "}
                  {volunteer.v_young === "Y" ? "청소년" : null}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">모집기관</Table.Cell>
                <Table.Cell className="content">{volunteer.v_organ}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">봉사장소</Table.Cell>
                <Table.Cell className="content">
                  {volunteer.v_location}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">봉사대상</Table.Cell>
                <Table.Cell className="content">
                  {volunteer.v_target}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">주소</Table.Cell>
                <Table.Cell className="content">
                  {volunteer.v_location}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="head">세부사항</Table.Cell>
                <Table.Cell className="content detail">
                  {volunteer.v_detail}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Responsive>
        <div className="buttons">
          <PostingButton v_id={volunteer.v_id} />
          <Link
            to={{
              pathname: `/${volunteer.v_id}/postinglist`
            }}
          >
            <Button>게시글 목록</Button>
          </Link>
          <Button as="a" href={volunteer.v_url}>
            신청하러 가기
        </Button>

        </div>
      </Container>
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
