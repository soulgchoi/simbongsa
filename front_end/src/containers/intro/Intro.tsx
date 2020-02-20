import React, { Component } from "react";
import ListUp from "components/intro/ListUp";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as authActions from "redux/modules/auth";
import AuthError from "components/error/AuthError";
interface Props {
  loginCheck: boolean;
}
interface State { }
class Intro extends Component<Props, State> {
  render() {
    const { loginCheck } = this.props;
    console.log("록쳌", loginCheck)
    return (
      <div>
        <Container>
          {!loginCheck && <AuthError error="로그인 후 이용해주세요!" />}
          <ListUp />
          {!loginCheck && <AuthError error="로그인 후 이용해주세요!" />}
        </Container>
      </div>
    );
  }
}

export default connect(
  ({ auth }: any) => ({
    loginCheck: auth.get("loginCheck")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Intro);
