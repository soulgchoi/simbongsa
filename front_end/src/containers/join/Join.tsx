import React from "react";
import { Link } from "react-router-dom";
// import "assets/css/style.scss";
// import "assets/css/user.scss";
import "assets/mycss/components.scss";
import validator from "validator";
import AuthError from "components/error/AuthError";
//storage = 데이터를 조금 더 편하게 넣고 조회하기 위한 헬퍼 모듈
import storage from "lib/storage";
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";

//debouce 특정 함수가 반복적으로 일어나면, 바로 실행하지 않고, 주어진 시간만큼 쉬어줘야 함수가 실행된다.
import debounce from "debounce";

class Join extends React.Component {
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("register");
  }

  validate = {
    email: (value: string) => {
      if (!validator.isEmail(value)) {
        this.setError("잘못된 이메일 형식 입니다.", value);
        return false;
      }
      return true;
    },
    username: (value: string) => {
      if (
        !validator.isAlphanumeric(value) ||
        !validator.isLength(value, { min: 4, max: 15 })
      ) {
        this.setError(
          "아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.",
          value
        );
        return false;
      }
      return true;
    },
    password: (value: string) => {
      if (!validator.isLength(value, { min: 8 })) {
        this.setError("비밀번호를 8자 이상 입력하세요.", value);
        return false;
      }
      this.setError(null, value); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    },
    passwordConfirm: (value: string) => {
      if (this.props.form.get("password") !== value) {
        this.setError("비밀번호확인이 일치하지 않습니다.", value);
        return false;
      }
      this.setError(null, value);
      return true;
    }
  };

  // 중복 체크

  checkEmailExists = debounce(async (email: string) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkEmailExists(email);
      if (this.props.exists.get("email")) {
        this.setError("이미 존재하는 이메일입니다.");
      } else {
        this.setError(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  checkUsernameExists = debounce(async (username: string) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkUsernameExists(username);
      if (this.props.exists.get("username")) {
        this.setError("이미 존재하는 아이디입니다.");
      } else {
        this.setError(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  handleChange = e => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: "register"
    });
    // 검증작업 진행
    const validation = this.validate[name](value);
    if (name.indexOf("password") > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침

    // TODO: 이메일, 아이디 중복 확인
    const check =
      name === "email" ? this.checkEmailExists : this.checkUsernameExists; // name 에 따라 이메일체크할지 아이디 체크 할지 결정
    check(value);
  };

  handleLocalRegister = async () => {
    const { form, AuthActions, UserActions, error, history } = this.props;
    const { email, userid, password, passwordConfirm } = form.toJS();

    const { validate } = this;

    if (error) return; // 현재 에러가 있는 상태라면 진행하지 않음
    if (
      !validate["email"](email) ||
      !validate["username"](userid) ||
      !validate["password"](password) ||
      !validate["passwordConfirm"](passwordConfirm)
    ) {
      // 하나라도 실패하면 진행하지 않음
      return;
    }

    try {
      await AuthActions.localRegister({
        email,
        userid,
        password
      });
      const loggedInfo = this.props.result.toJS();
      console.log(loggedInfo);
      // TODO: 로그인 정보 저장 (로컬스토리지/스토어)
      storage.set("loggedInfo", loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      UserActions.setValidated(true);
      history.push("/"); // 회원가입 성공시 홈페이지로 이동
    } catch (e) {
      // 에러 처리하기
      if (e.response.status === 409) {
        const { key } = e.response.data;
        const message =
          key === "email"
            ? "이미 존재하는 이메일입니다."
            : "이미 존재하는 아이디입니다.";
        return this.setError(message);
      }
      this.setError("알 수 없는 에러가 발생했습니다.");
    }
  };
  render() {
    const { error } = this.props;
    const { email, userid, password, passwordConfirm } = this.props.form.toJS();
    const { handleChange, handleLocalRegister } = this;
    return (
      <div className="user" id="join">
        <div className="wrapC">
          <h1 className="title">가입하기</h1>
          <div className="input-with-label">
            <input
              value={userid}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  // this.login();
                }
              }}
              onChange={handleChange}
              id="nickName"
              placeholder="아이디를 입력하세요."
              type="text"
            />
            <label htmlFor="nickName">아이디</label>
            <div className="error-text">
              {error.userid && <AuthError>{error.userid}</AuthError>}
            </div>
          </div>
          <div className="input-with-label">
            <input
              value={email}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  //this.login();
                }
              }}
              onChange={handleChange}
              id="email"
              placeholder="이메일을 입력하세요."
              type="text"
            />
            <label htmlFor="email">이메일</label>
            <div className="error-text">
              {error.email && <AuthError>{error.email}</AuthError>}
            </div>
          </div>

          <div className="input-with-label">
            <input
              value={password}
              type="password"
              id="password"
              onKeyDown={event => {
                if (event.key === "Enter") {
                  //this.login();
                }
              }}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요."
            />
            <label htmlFor="password">비밀번호</label>
            <div className="error-text">
              {error.password && <AuthError>{error.password}</AuthError>}
            </div>
          </div>

          <div className="input-with-label">
            <input
              value={passwordConfirm}
              type="password"
              id="passwordConfirm"
              onKeyDown={event => {
                if (event.key === "Enter") {
                  //this.login();
                }
              }}
              onChange={handleChange}
              placeholder="비밀번호를 다시한번 입력하세요."
            />
            <label htmlFor="password">비밀번호 확인</label>
            <div className="error-text">
              {error.passwordConfirm && (
                <AuthError>{error.passwordConfirm}</AuthError>
              )}
            </div>
          </div>

          {/* <label>
            <input
              checked={this.state.isTerm}
              type="checkbox"
              id="term"
              onChange={this.handleCheckBox}
            />
            <span>약관을 동의합니다.</span>
          </label> */}

          <span onClick={() => this.setState({ termPopup: true })}>
            약관보기
          </span>
          <br />
          <br />
          <Link
            to={{
              pathname: "/join/complete",
              state: { email: email }
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

export default connect(
  state => ({
    form: state.auth.getIn(["join", "form"]),
    error: state.auth.getIn(["join", "error"]),
    exists: state.auth.getIn(["join", "exists"]),
    result: state.auth.get("result")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Join);
