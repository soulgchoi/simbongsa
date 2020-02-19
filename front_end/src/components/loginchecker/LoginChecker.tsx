import React, { Component } from "react";
import storage from "lib/storage";
interface Props {
  history: any;
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
  componentDidUpdate() {
    console.log("주소", window.location.href);
    const url = window.location.href.split(
      `${process.env.REACT_APP_FRONT_URI!}/`
    )[1];
    const token = storage.get("token");
    // 토큰이 존재 하지 않음 === 로그인 안함
    // 로그인 안한 사람이 로그인이 필요한 페이지 접근시 강제로 인트로 페이지로 보냄
    const needAuthUrl = /mainpage feed mypage usersetting calendar/;
    if (
      (token === "EmailAuthenticateNeed" ||
        token === "undefined" ||
        token === null) &&
      url !== "" &&
      !needAuthUrl.test(url)
    ) {
      this.props.history.push("/");
    }
  }
  render() {
    return <div></div>;
  }
}
