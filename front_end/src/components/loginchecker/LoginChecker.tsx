import React, { Component } from "react";
import storage from "lib/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import AuthError from "components/error/AuthError";

interface Props {
  history: any;
  AuthActions: typeof authActions;
  loginCheck: boolean;
}
interface State { }

class LoginChecker extends Component<Props, State> {
  state = {};
  componentDidMount() {
    console.log("주소", window.location.href);
    const url = window.location.href.split(
      `${process.env.REACT_APP_FRONT_URI!}/`
    )[1].split('#')[0];
    console.log("유알엘", url);
    const token = storage.get("token");
    if (token === "EmailAuthenticateNeed") {
      this.props.history.push("/mailresend");
    }
    if ((token === "undefined" || token === null) && url !== 'login') {
      this.props.history.push("/");
    }
    console.log("통과");
  }
  componentDidUpdate() {
    console.log("주소", window.location.href);
    const url = window.location.href.split(
      `${process.env.REACT_APP_FRONT_URI!}/`
    )[1];
    const token = storage.get("token");
    // 토큰이 존재 하지 않음 === 로그인 안함
    // 로그인 안한 사람이 로그인이 필요한 페이지 접근시 강제로 인트로 페이지로 보냄
    const needAuthUrl = /\bmainpage\b|\bfeed\b|\bmypage\b|\busersetting\b|\bcalendar\b/;
    if (token === "EmailAuthenticateNeed") {
      this.props.history.push("/mailresend");
    }
    if ((token === "undefined" || token === null) && needAuthUrl.test(url)) {
      const { AuthActions } = this.props;
      AuthActions.loginCheck(false);
      this.props.history.push("/");
    }
  }
  render() {
    return <div></div>;
  }
}

export default connect(
  (state: any) => ({
    loginCheck: state.auth.get("loginCheck")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(LoginChecker);
