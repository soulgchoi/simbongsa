import React, { Component } from "react";
import storage from "lib/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import AuthError from "components/error/AuthError";

interface Props {
  history: any;
  AuthActions: any;
}
interface State {}

export default class LoginChecker extends Component<Props, State> {
  state = {};
  componentDidMount() {
    const token = storage.get("token");
    if (token === "EmailAuthenticateNeed") {
      this.props.history.push("/mailresend");
    }
    if (token === "undefined" || token === null) {
      this.props.history.push("/");
    }
  }
  asyncFunction = async () => {
    const { AuthActions } = this.props;
    await AuthActions.loginCheck(true);
  };
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
      this.asyncFunction();
      this.props.history.push("/");
    }
  }
  render() {
    return <div></div>;
  }
}

connect(
  ({ auth }: any) => ({
    loginCheck: auth.get("loginCheck")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(LoginChecker);
