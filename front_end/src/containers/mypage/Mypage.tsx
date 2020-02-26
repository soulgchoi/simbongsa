import React, { Component } from "react";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as volActions from "redux/modules/vol";
import Tab from "containers/mypage/TabforMypage";
import { Container } from "semantic-ui-react";

interface Props {
  VolActions: any;
  userId: string;
}
interface State {
}

class Mypage extends Component<Props, State> {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { VolActions, userId } = this.props;
    VolActions.getVolListByUserId(userId);
  }

  render() {
    return (
      <div>
        <Container text>
          <Tab />
        </Container>
      </div>
    );
  }
}

export default connect(
  ({ user }: any) => ({
    userId: user.getIn(["loggedInfo", "userId"]),
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(Mypage);
