import React from "react";
import "assets/css/style.scss";
import "assets/css/user.scss";
import "assets/mycss/components.scss";
import PV from "password-validator";
import * as EmailValidator from "email-validator";
import KakaoLogin from "components/user/snsLogin/Kakao";
import GoogleLogin from "components/user/snsLogin/Google";
import * as UserApi from "apis/UserApi";

// 직접 제작한 Components
import LinkButton from "components/button/LinkButton";
import ActionButton from "components/button/ActionButton";
import Input from "components/input/Input";
import ErrorMessage from "components/error/ErrorMessage";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    passwordSchema: new PV(),
    error: {
      email: "",
      password: ""
    },
    isSubmit: false,
    component: this
  };
  componentDidMount() {
    console.log(window.location.href);
    this.state.passwordSchema
      .is()
      .min(8)
      .is()
      .max(100)
      .has()
      .digits()
      .has()
      .letters();
  }
  checkForm = () => {
    let error = { ...this.state.error };
    if (
      this.state.email.length >= 0 &&
      !EmailValidator.validate(this.state.email)
    ) {
      error.email = "이메일 형식이 아닙니다.";
    } else {
      error.email = "";
    }
    if (
      this.state.password.length >= 0 &&
      !this.state.passwordSchema.validate(this.state.password)
    )
      error.password = "영문,숫자 포함 8 자리이상이어야 합니다.";
    else error.password = "";
    this.setState({ error: error }, () => {
      let isSubmit = true;
      Object.values(this.state.error).map(v => {
        if (v) isSubmit = false;
        return v;
      });
      this.setState({
        isSubmit: isSubmit
      });
    });
  };
  login = () => {
    if (this.state.isSubmit) {
      let { email, password } = this.state;
      //요청 후에는 버튼 비활성화
      this.setState({ isSubmit: false });
      // this.state.isSubmit = false;

      UserApi.localLogin(email, password); // 성공하면 Back쪽에서 넘겨주는 데이터를 리턴함.

      // UserApi.requestLogin(
      //   data,
      //   res => {
      //     //통신을 통해 전달받은 값 콘솔에 출력

      //     //정상적인 응답이 와도 우선 로그인 실패로 간주하고 알람 띄우기
      //     alert("로그인 실패하였습니다.");

      //     //요청이 끝나면 버튼 활성화
      //     this.setState({ isSubmit: true });
      //     // this.state.isSubmit = true;
      //   },
      //   error => {
      //     //요청이 끝나면 버튼 활성화
      //     this.setState({ isSubmit: true });
      //     //this.state.isSubmit = true;
      //   }
      // );
    }
  };
  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    // this.setState({ email: e.target.value });
    this.setState({ email: e.currentTarget.value }, () => {
      this.checkForm();
    });
  };
  handleInput2 = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value }, () => {
      this.checkForm();
    });
  };
  render() {
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <h1 className="title">로그인</h1>
          <Input
            value={this.state.email}
            onChange={this.handleInput}
            id="email"
            placeholder="이메일을 입력하세요."
            name="이메일"
            type="text"
          />
          <ErrorMessage message={this.state.error.email} />
          <Input
            value={this.state.password}
            type="password"
            id="password"
            onEnter={this.login}
            onChange={this.handleInput2}
            placeholder="비밀번호를 입력하세요."
            name="비밀번호"
          />
          <ErrorMessage message={this.state.error.password} />
          <ActionButton
            placeholder="로그인"
            action={this.login}
            disabled={!this.state.isSubmit}
          ></ActionButton>

          <div className="sns-login">
            <div className="text">
              <p>SNS 간편 로그인</p>
              <div className="bar"></div>
            </div>

            <KakaoLogin />
            <GoogleLogin />
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

export default Login;
