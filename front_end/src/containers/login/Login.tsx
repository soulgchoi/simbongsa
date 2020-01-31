import React from "react";
import "assets/css/style.scss";
import "assets/css/user.scss";
import "assets/mycss/components.scss";
import PV from "password-validator";
// import KakaoLogin from "components/user/snsLogin/Kakao";
// import GoogleLogin from "components/user/snsLogin/Google";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import * as UserApi from "lib/api/UserApi";

// 직접 제작한 Components
import LinkButton from "components/button/LinkButton";
import ActionButton from "components/button/ActionButton";
import Input from "components/input/Input";
import AuthError from "components/error/AuthError";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import storage from "lib/storage";

class Login extends React.Component<any, any> {
  handleChange = (e: any) => {
    const { AuthActions } = this.props;
    const { id, value } = e.target;
    AuthActions.changeInput({
      id,
      value,
      form: "login"
    });
  };

  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("login");
  }
  setError = (message: any, name: string) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "login",
      message,
      name
    });
    return false;
  };

  handleLocalLogin = async () => {
    const { form, AuthActions, UserActions, history } = this.props;
    const { email, password } = form.toJS();

    try {
      await AuthActions.localLogin({ email, password });
      const loggedInfo = this.props.result;
      let data = { sessionId: loggedInfo.data };
      UserActions.setLoggedInfo(data);
      // UserActions.setLoggedFlag(true);
      history.push("/");
      storage.set("loggedInfo", data);
      console.log("로그인 3: ", this.props);
    } catch (e) {
      console.log(e);
      console.log("a");
      this.setError("잘못된 계정정보입니다.", email);
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
            nametag="email"
            placeholder="이메일을 입력하세요."
            type="text"
            value={email}
            onChange={handleChange}
          />
          <AuthError error={error2.email}></AuthError>
          <Input
            id="password"
            nametag="password"
            placeholder="비밀번호를 입력하세요."
            type="password"
            value={password}
            onChange={handleChange}
          />

          <AuthError error={error2.password}></AuthError>
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
export default connect(
  (state: any) => ({
    form: state.auth.getIn(["login", "form"]),
    error: state.auth.getIn(["login", "error"]),
    result: state.auth.get("result"),
    sessionId: state.user.get("loggedInfo").toJS(),
    logged: state.user.get("logged")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Login);
