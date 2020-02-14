import React, { Component } from "react";

// redux 관련
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import PieGraph from 'components/graph/PieGraph';
import * as volActions from 'redux/modules/vol';

interface Props { VolActions: any, userId: string, volListByUser: [] }
interface State { }

class Mypage extends Component<Props, State> {
  state = {

  };
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    const { VolActions, userId } = this.props;
    console.log("유저 아이디 ", userId);
    VolActions.getVolListByUserId(userId);
  }
  componentDidUpdate() {
    const { volListByUser , userId } = this.props;
    console.log("유저 아이디 ", userId);
    console.log("봉사 리스트 ", volListByUser);
    // TODO : volListByUser에서 봉사지역, 봉사 시간등을 추출해서 통계 자료 data, labels 만들기...
  }

  render() {
    return (
      <div>
        마이페이지 입니다.
        <div>
          <div ><PieGraph data={[10, 20, 30, 40, 5, 5, 5, 5, 5, 5, 5, 5, 5]} labels={["red", "blue", "green"]} width={300} height={300} />
          </div>
          <PieGraph data={[10, 20, 30, 40, 5, 5, 5, 5, 5, 5, 5, 5, 5]} labels={["red", "blue", "green"]} width={300} height={300} />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ user, vol }: any) => ({
    userId: user.getIn(["loggedInfo", "userId"]),
    volListByUser: vol.get("volListByUser")
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(Mypage);
