import React from "react";
import { Link } from "react-router-dom";
// import "assets/css/style.scss";

// import "assets/css/user.scss";
import "assets/mycss/components.scss";
import validator from "validator";

//storage = 데이터를 조금 더 편하게 넣고 조회하기 위한 헬퍼 모듈
import storage from "lib/storage";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";

// 직접 제작한 Components
import LinkButton from "components/button/LinkButton";
import ActionButton from "components/button/ActionButton";
import Input from "components/input/Input";
import AuthError from "components/error/AuthError";

//debouce 특정 함수가 반복적으로 일어나면, 바로 실행하지 않고, 주어진 시간만큼 쉬어줘야 함수가 실행된다.
import debounce from "lodash/debounce";

interface validate {
  [name: string]: (value: string) => boolean;
}

class Join extends React.Component<any, any> {
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("register");
  }
  setError = (message: any, name: string) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "join",
      message,
      name
    });
  };
  validate: validate = {
    email: (value: string) => {
      if (!validator.isEmail(value)) {
        this.setError("잘못된 이메일 형식 입니다.", "email");
        return false;
      }
      this.setError(null, "email");
      return true;
    },
    userid: (value: string) => {
      if (
        !validator.isAlphanumeric(value) ||
        !validator.isLength(value, { min: 4, max: 15 })
      ) {
        this.setError(
          "아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.",
          "userid"
        );
        return false;
      }
      this.setError(null, "userid");
      return true;
    },
    password: (value: string) => {
      if (!validator.isLength(value, { min: 8 })) {
        this.setError("비밀번호를 8자 이상 입력하세요.", "password");
        return false;
      }
      this.setError(null, "password"); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    },
    passwordConfirm: (value: string) => {
      if (this.props.form.get("password") !== value) {
        this.setError("비밀번호확인이 일치하지 않습니다.", "passwordConfirm");
        return false;
      }
      this.setError(null, "passwordConfirm");
      return true;
    }
  };

  // 중복 체크

  checkEmailExists = debounce(async (email: string) => {
    const { AuthActions } = this.props;
    try {
      console.log("체크1: ", email);
      await AuthActions.checkEmailExists(email);
      if (this.props.exists.get("email")) {
        this.setError("이미 존재하는 이메일입니다.", email);
      } else {
        this.setError(null, email);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  checkUsernameExists = debounce(async (userid: string) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkUsernameExists(userid);
      if (this.props.exists.get("username")) {
        this.setError("이미 존재하는 아이디입니다.", userid);
      } else {
        this.setError(null, userid);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  handleChange = (e: any) => {
    const { AuthActions } = this.props;
    const { id, value } = e.target;
    console.log(e.target);
    AuthActions.changeInput({
      id,
      value,
      form: "join"
    });
    console.log();
    // 검증작업 진행

    const validation = this.validate[id](value);
    if (id.indexOf("password") > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침

    // TODO: 이메일, 아이디 중복 확인
    const check =
      id === "email" ? this.checkEmailExists : this.checkUsernameExists; // name 에 따라 이메일체크할지 아이디 체크 할지 결정
    // console.log("체크2 : ", value);
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
        return this.setError(message, email);
      }
      this.setError("알 수 없는 에러가 발생했습니다.", email);
    }
  };
  render() {
    const { error } = this.props;
    const error2 = error.toJS();
    console.log("에러: ", typeof error2.email);
    const { email, userid, password, passwordConfirm } = this.props.form.toJS();
    const { handleChange, handleLocalRegister } = this;
    return (
      <div className="user" id="join">
        <div className="wrapC">
          <h1 className="title">가입하기</h1>
          <Input
            value={userid}
            onChange={handleChange}
            id="userid"
            placeholder="아이디를 입력하세요"
            type="text"
            nametag="아이디"
          />
          <AuthError error={error2.userid}></AuthError>
          <Input
            value={email}
            onChange={handleChange}
            id="email"
            placeholder="이메일을 입력하세요"
            type="text"
            nametag="이메일"
          />
          <AuthError error={error2.email}></AuthError>

          <Input
            value={password}
            onChange={handleChange}
            id="password"
            placeholder="비밀번호를 입력하세요"
            type="password"
            nametag="비밀번호"
          />
          <AuthError error={error2.password}></AuthError>

          <Input
            value={passwordConfirm}
            onChange={handleChange}
            id="passwordConfirm"
            placeholder="비밀번호를 다시한번 입력하세요"
            type="password"
            nametag="비밀번호 확인"
          />
          <AuthError error={error2.passwordConfirm}></AuthError>

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
            className="my--btn"
          >
            가입하기
          </Link>
          {/* <LinkButton link="/join/complete" placeholder="가입하기" /> */}
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
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
