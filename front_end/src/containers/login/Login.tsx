import React from "react";
import PV from "password-validator";

// CSS
import "assets/css/style.scss";
import "assets/css/user.scss";
import "assets/mycss/components.scss";

// API 관련
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import * as UserApi from "lib/api/UserApi";

// 직접 제작한 Components
import LinkButton from "components/button/LinkButton";
import ActionButton from "components/button/ActionButton";
import Input from "components/input/Input";
import AuthError from "components/error/AuthError";
// local storage에 저장하는 component

import storage from "lib/storage";
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";

// Login Class Component

class Login extends React.Component<any, any> {

  // 이벤트에 따라 인풋의 변화를 State로 갱신하는 함수.
  handleChange = (e: any) => {
    const { AuthActions } = this.props;
    const { id, value } = e.target;
    AuthActions.changeInput({
      id,
      value,
      form: "login"
    });
  };

  // 컴포넌트가 종료될때 로그인 폼을 초기화 시킨다.
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("login");
  }

  // 에러 메세지 설정

  setError = (message: any, name: string) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "login",
      message,
      name
    });
    return false;
  };

  // 로그인 처리

  handleLocalLogin = async () => {
    const { form, AuthActions, UserActions, history } = this.props;
    const { email, password } = form.toJS();


    // 로그인을 시도

    try {
      await AuthActions.localLogin({ email, password });
<<<<<<< HEAD
      // 성공하면
      console.log("최초확인용", this.props)
      const loggedInfo = this.props.result.toJS()
      console.log("loggedInfo:", loggedInfo)
=======
      console.log("최초확인용", this.props);
      const loggedInfo = this.props.result.toJS();
      console.log("loggedInfo:", loggedInfo);
>>>>>>> ea5230d97c2beafb607691fbf2f1e6fe59a9084a

      // 유저 정보에 설정
      UserActions.setLoggedInfo(loggedInfo);
      // UserActions.setLoggedFlag(true);
      // 로그인 성공시 메인페이지로 보낸다.
      history.push("/mainpage");
<<<<<<< HEAD

      // 로컬 스토리지에 JWT을 저장.
      storage.set("loggedInfo", loggedInfo)
=======
      storage.set("loggedInfo", loggedInfo);
>>>>>>> ea5230d97c2beafb607691fbf2f1e6fe59a9084a
      console.log("로그인 후: ", this.props.loggedInfo.toJS());
    } catch (e) {
      // error 발생시
      console.log(e);
      this.setError("잘못된 계정정보입니다.", "email");
    }
  };

  render() {
    const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
    const { handleChange, handleLocalLogin } = this;
    const { error } = this.props;
    const error2 = error.toJS();
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <h1 className="title">로그인</h1>
          <Input
            id="email"
            nametag="ID"
            placeholder="아이디를 입력하세요."
            type="text"
            value={email}
            onChange={handleChange}
          />
          <Input
            id="password"
            nametag="password"
            placeholder="비밀번호를 입력하세요."
            type="password"
            value={password}
            onChange={handleChange}
          />
          <AuthError error={error2.email}></AuthError>
          <ActionButton
            placeholder="로그인"
            action={handleLocalLogin}
          ></ActionButton>
          <div className="sns-login">
            <div className="text">
              <p>SNS 간편 로그인</p>
              <div className="bar"></div>
            </div>
            {/* <KakaoLogin
              jsKey="kakao-js-key"
              onSuccess={result => console.log(result)}
              onFailure={result => console.log(result)}
              getProfile={true}
            /> */}
            <GoogleLogin
              clientId="250805409546-er21fuvg0j0v3db818cs9jjirslg0lpq.apps.googleusercontent.com"
              onSuccess={result => console.log(result)}
              onFailure={result => console.log(result)}
              cookiePolicy={"single_host_origin"}
              redirectUri="http://www.naver.com"
            />
          </div>
          <div className="add-option">
            <div className="bar" />
            <LinkButton link="/findpassword" placeholder="비밀번호 찾기" />
            <LinkButton placeholder="회원가입" link="/join" />
          </div>
        </div>
      </div>
    );
  }
}
// State와 action을 연결짓는 connect
export default connect(
  (state: any) => ({
    // props로 받아오는 정보들...
    form: state.auth.getIn(["login", "form"]),
    error: state.auth.getIn(["login", "error"]),
    result: state.auth.get("result"),
    logged: state.user.get("logged"),
    loggedInfo: state.user.get("loggedInfo")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Login);
