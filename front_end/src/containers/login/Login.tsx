import React from "react";
// import "assets/mycss";
import PV from "password-validator";
// import KakaoLogin from "components/user/snsLogin/Kakao";
// import GoogleLogin from "components/user/snsLogin/Google";
import GoogleLogin from "react-google-login";

import ReactCountUp from "react-countup";
import ScrollAnimation from "react-animate-on-scroll";
//@ts-ignore
import ReactPageScroller from "react-page-scroller"; // @types/react-page-scroller 가 없어서 위에 // @ts-ignore 를 추가

// 직접 제작한 Components
import LinkButton from "components/button/LinkButton";
import ActionButton from "components/button/ActionButton";
import Input from "components/input/Input";
import AuthError from "components/error/AuthError";
// local storage에 저장하는 component

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import * as baseActions from "redux/modules/base";
import storage from "lib/storage";

// jwt
import jwt from "jsonwebtoken";

class Login extends React.Component<any, any> {
  handlePageChange = (number: any) => {
    const { BaseActions } = this.props;
    BaseActions.setInitialNumber(number); // set initial number, to reset it from the previous selected.
  };

  // getPagesNumbers = () => {
  //   const pageNumbers = [];

  //   for (let i = 1; i <= 5; i++) {
  //     pageNumbers.push(
  //       <div>{i}</div>
  //       // import { Pager } from "react-bootstrap"; 해야함
  //       // <Pager.Item key={i} eventKey={i - 1} onSelect={this.handlePageChange}>
  //       //   {i}
  //       // </Pager.Item>,
  //     );
  //   }
  //   return [...pageNumbers];
  // };

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
      console.log("최초확인용", this.props.result.toJS());
      const token = this.props.result.toJS().token;
      const loggedInfo = jwt.decode(token);
      console.log("유저이메일", loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      // UserActions.setLoggedFlag(true);
      storage.set("token", token);
      history.push("/mainpage");
    } catch (e) {
      // error 발생시
      console.log(e);
      this.setError("잘못된 계정정보입니다.", "email");
    }
  };

  handleGoogleLogin = async (response: any) => {
    const { AuthActions, UserActions, history } = this.props;
    // 구글로그인 성공할 경우 response로 로그인 정보가 담긴 객체 하나를 준다.
    const id_token = response.getAuthResponse().id_token;
    // 그 중 id_token 에 담긴 구글 로그인 정보를 백엔드에 전달해 줌.
    await AuthActions.googleLogin(id_token);
    const token = this.props.result.toJS().token;
    const userEmail = jwt.decode(token);
    UserActions.setLoggedInfo(userEmail);
    storage.set("token", token);
    history.push("/mainpage");
  };

  render() {
    console.log(this.props.loggedInfo.toJS());
    const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
    const { handleChange, handleLocalLogin, handleGoogleLogin } = this;
    const { error } = this.props;
    const error2 = error.toJS();
    // const pagesNumbers = this.getPagesNumbers();
    return (
      <div>
        <ReactPageScroller
          pageOnChange={this.handlePageChange}
          animationTimer={700}
        >
          <div className="user" id="login2">
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
                clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID!}
                onSuccess={handleGoogleLogin}
                onFailure={result => console.log(result)}
                cookiePolicy={"single_host_origin"}
                redirectUri={process.env.REACT_APP_FRONT_URI}
              />
            </div>
            <div className="add-option">
              <div className="bar" />
              <LinkButton link="/findpassword" placeholder="비밀번호 찾기" />
              <LinkButton placeholder="회원가입" link="/join" />
            </div>
          </div>
          <div id="page">
            <div id="content">
              <ReactCountUp
                start={this.props.initialNumber}
                end={12546}
                duration={2}
                separator=","
                // decimals={4}
                // decimal=","
                prefix="등록 된 봉사활동 수 : "
                suffix=" 개"
                redraw={true}
                // onEnd={() => console.log('Ended! 👏')}
                // onStart={() => console.log('Started! 💨')}
              >
                {/* {({ countUpRef, start }) => (
            <div>
            { <span ref={countUpRef} />
            <button onClick={start}>Start</button> }
            </div>
          )} */}
              </ReactCountUp>
            </div>
          </div>
          <div id="page">
            <div id="content">
              <ReactCountUp
                start={this.props.initialNumber}
                end={12546}
                duration={2}
                separator=","
                redraw={true}
                prefix="게시글  "
                suffix=" 개"
              />
            </div>
          </div>
        </ReactPageScroller>
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
    loggedInfo: state.user.get("loggedInfo"),
    initialNumber: state.base.get("initialNumber")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Login);
