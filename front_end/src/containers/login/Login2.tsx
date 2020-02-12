import React from "react";
import "assets/mycss";
import PV from "password-validator";
// import KakaoLogin from "components/user/snsLogin/Kakao";
// import GoogleLogin from "components/user/snsLogin/Google";
import GoogleLogin from "react-google-login";

import ReactCountUp from "react-countup";
import ScrollAnimation from 'react-animate-on-scroll';
//@ts-ignore
import ReactPageScroller from "react-page-scroller"; // @types/react-page-scroller 가 없어서 위에 // @ts-ignore 를 추가

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
import * as baseActions from "redux/modules/base";
import storage from "lib/storage";

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
      console.log("최초확인용", this.props);
      const loggedInfo = this.props.result.toJS();
      console.log("loggedInfo:", loggedInfo);

      UserActions.setLoggedInfo(loggedInfo);
      // UserActions.setLoggedFlag(true);
      history.push("/mainpage");
      storage.set("loggedInfo", loggedInfo);
      console.log("로그인 후: ", this.props.loggedInfo.toJS());
    } catch (e) {
      console.log(e);
      this.setError("잘못된 계정정보입니다.", "email");
    }
  };

  render() {
    console.log(this.props.loggedInfo.toJS());
    const { email, password } = this.props.form.toJS(); // form 에서 email 과 password 값을 읽어옴
    const { handleChange, handleLocalLogin } = this;
    const { AuthActions } = this.props;
    const { error } = this.props;
    const error2 = error.toJS();
    // const pagesNumbers = this.getPagesNumbers();
    return (


      <div className="temp">
        <ScrollAnimation duration={3} animateIn='bounceInRight'
          animateOut='fadeOut'>
          <h1>
            React Animate On Scroll
  </h1>
          <h2>
            Using:
  </h2>
        </ScrollAnimation>
        <ScrollAnimation animateIn='bounceInRight'
          animateOut='bounceOutLeft'>
          <h2>
            <a href='https://daneden.github.io/animate.css/'>
              Animate.css
    </a>
          </h2>
        </ScrollAnimation>
      </div>
    );
  }
}
export default connect(
  (state: any) => ({
    form: state.auth.getIn(["login", "form"]),
    error: state.auth.getIn(["login", "error"]),
    result: state.auth.get("result"),
    logged: state.user.get("logged"),
    loggedInfo: state.user.get("loggedInfo"),
    initialNumber: state.base.get('initialNumber')
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Login);
