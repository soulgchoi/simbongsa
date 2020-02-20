import React, { Component } from "react";
import ListUp from "components/intro/ListUp";
import { Container, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import './Intro.css'
import * as authActions from "redux/modules/auth";
import AuthError from "components/error/AuthError";
interface Props {
  loginCheck: boolean;
}
interface State {}
class Intro extends Component<Props & any, State> {
  
  render() {
    const { loginCheck } = this.props;
    return (
      <div>
        {!loginCheck ?
         (<Container gref>
          <ListUp />
          <div className="loginbutton" >
          <AuthError error="로그인 후 이용해주세요!" />
          <Button className="loginbutton" as="a" href="/login">로그인</Button>
          </div>
          </Container>)
        : (<Container>
          <ListUp />
          </Container>)
          }

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
