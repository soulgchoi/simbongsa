import React from "react";
import { Link } from "react-router-dom";
// import "assets/css/style.scss";
// import "assets/css/user.scss";
import "assets/mycss/components.scss";
import PV from "password-validator";
import * as EmailValidator from "email-validator";

class Join extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    passwordSchema: new PV(),
    nickName: "",
    isTerm: false,
    isLoading: false,
    error: {
      email: "",
      password: "",
      nickName: "",
      passwordConfirm: "",
      term: false
    },
    isSubmit: false,
    passwordType: "password",
    passwordConfirmType: "password",
    termPopup: false
  };
  componentDidMount() {
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
  handleNickName = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ nickName: e.currentTarget.value }, () => {
      this.checkForm();
    });
  };
  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value }, () => {
      this.checkForm();
    });
  };
  handleInput2 = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value }, () => {
      this.checkForm();
    });
  };
  handleInput3 = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ passwordConfirm: e.currentTarget.value }, () => {
      this.checkForm();
    });
  };
  handleCheckBox = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ isTerm: e.currentTarget.checked }, () => {
      this.checkForm();
    });
  };
  checkForm = () => {
    let error = { ...this.state.error };
    if (this.state.nickName.length <= 0) {
      error.nickName = "닉네임을 입력해주세요.";
    } else {
      error.nickName = "";
    }
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
    ) {
      error.password = "영문,숫자 포함 8 자리이상이어야 합니다.";
    } else error.password = "";
    if (this.state.password !== this.state.passwordConfirm) {
      error.passwordConfirm = "비밀번호 확인이 비밀번호와 일치하지 않습니다.";
    } else error.passwordConfirm = "";
    this.setState({ error: error }, () => {
      let isSubmit = true;
      Object.values(this.state.error).map(v => {
        if (v) isSubmit = false;
        return v;
      });
      if (!this.state.isTerm) isSubmit = false;
      this.setState({
        isSubmit: isSubmit
      });
    });
    // console.log("체크: ", this.state.isTerm);
    // console.log(this.state.isSubmit);
  };
  render() {
    return (
      <div className="user" id="join">
        <div className="wrapC">
          <h1 className="title">가입하기</h1>
          <div className="input-with-label">
            <input
              value={this.state.nickName}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  // this.login();
                }
              }}
              onChange={this.handleNickName}
              id="nickName"
              placeholder="닉네임을 입력하세요."
              type="text"
            />
            <label htmlFor="nickName">닉네임</label>
            <div className="error-text" v-if="error.nickName">
              {this.state.error.nickName}
            </div>
          </div>

          <div className="input-with-label">
            <input
              value={this.state.email}
              v-bind="{error : error.password, complete:!error.password&&password.length!==0}"
              onKeyDown={event => {
                if (event.key === "Enter") {
                  //this.login();
                }
              }}
              onChange={this.handleInput}
              id="email"
              placeholder="이메일을 입력하세요."
              type="text"
            />
            <label htmlFor="email">이메일</label>
            <div className="error-text" v-if="error.email">
              {this.state.error.email}
            </div>
          </div>

          <div className="input-with-label">
            <input
              value={this.state.password}
              type="password"
              v-bind="{error : error.password, complete:!error.password&&password.length!==0}"
              id="password"
              onKeyDown={event => {
                if (event.key === "Enter") {
                  //this.login();
                }
              }}
              onChange={this.handleInput2}
              placeholder="비밀번호를 입력하세요."
            />
            <label htmlFor="password">비밀번호</label>
            <div className="error-text" v-if="error.password">
              {this.state.error.password}
            </div>
          </div>

          <div className="input-with-label">
            <input
              value={this.state.passwordConfirm}
              type="password"
              v-bind="{error : error.password, complete:!error.password&&password.length!==0}"
              id="passwordConfirm"
              onKeyDown={event => {
                if (event.key === "Enter") {
                  //this.login();
                }
              }}
              onChange={this.handleInput3}
              placeholder="비밀번호를 다시한번 입력하세요."
            />
            <label htmlFor="password">비밀번호 확인</label>
            <div className="error-text" v-if="error.password">
              {this.state.error.passwordConfirm}
            </div>
          </div>

          <label>
            <input
              checked={this.state.isTerm}
              type="checkbox"
              id="term"
              onChange={this.handleCheckBox}
            />
            <span>약관을 동의합니다.</span>
          </label>

          <span onClick={() => this.setState({ termPopup: true })}>
            약관보기
          </span>
          <br />
          <br />
          <Link
            to={{
              pathname: "/join/complete",
              state: { email: this.state.email }
            }}
            className="btn--back"
          >
            <button
              className="btn btn--back btn--join"
              disabled={!this.state.isSubmit}
            >
              가입하기
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Join;
