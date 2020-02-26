import React, { Component } from "react";
import * as UserApi from "lib/api/UserApi";
import validator from "validator";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input } from "semantic-ui-react";
import AuthError from "components/error/AuthError";
import * as AuthApi from 'lib/api/AuthApi';
import ActionButton from 'components/button/ActionButton'
interface Props {
  email: string;
}
interface State {
  password: string;
  passwordConfirm: string;
  error: {
    password: string;
    passwordConfirm: string;
  };
  message: string;
}

interface validate {
  [name: string]: (value: string) => boolean;
}

class ChangePassword extends Component<Props, State> {
  state = {
    password: "",
    passwordConfirm: "",
    error: { password: "", passwordConfirm: "" },
    message: ""
  };
  // handleChangePassword = () => {
  //   const { email } = this.props;
  //   let password = "";
  //   let response = UserApi.changePassword(email, password);
  //   response.then(item => {
  //     console.log(item);
  //   });
  // };
  // handleChangePasswordConfirm = () => {
  //   const { email } = this.props;
  //   let password = "";
  //   let response = UserApi.changePassword(email, password);
  //   response.then(item => {
  //     console.log(item);
  //   });
  // };

  // setError = (message: any, name: string) => {
  //   // const { AuthActions } = this.props;
  //   // AuthActions.setError({
  //   //   form: "join",
  //   //   message,
  //   //   name
  //   // });
  // };

  // validate: validate = {
  //   email: (value: string) => {
  //     if (!validator.isEmail(value)) {
  //       this.setError("잘못된 이메일 형식 입니다.", "email");
  //       return false;
  //     }
  //     this.setError(null, "email");
  //     return true;
  //   },
  //   userid: (value: string) => {
  //     if (
  //       !validator.isAlphanumeric(value) ||
  //       !validator.isLength(value, { min: 4, max: 15 })
  //     ) {
  //       this.setError(
  //         "아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.",
  //         "userid"
  //       );
  //       return false;
  //     }
  //     this.setError(null, "userid");
  //     return true;
  //   },
  //   password: (value: string) => {
  //     if (!validator.isLength(value, { min: 8 })) {
  //       this.setError("비밀번호를 8자 이상 입력하세요.", "password");
  //       return false;
  //     }
  //     this.setError(null, "password"); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
  //     return true;
  //   },
  //   passwordConfirm: (value: string) => {
  //     if (this.state.password !== value) {
  //       this.setError("비밀번호확인이 일치하지 않습니다.", "passwordConfirm");
  //       return false;
  //     }
  //     this.setError(null, "passwordConfirm");
  //     return true;
  //   }
  // };

  sendEmail = () => {
    const { email } = this.props;
    AuthApi.changePasswordEmailSend(email);
    // history.push("/findpasswordmailsend");
    this.setState({ message: "메일 발송 완료" });
  }

  render() {
    const { sendEmail } = this;
    const { message } = this.state;
    return (
      <div>
        <ActionButton action={sendEmail} placeholder="비밀번호 변경 메일 발송" />
        {message}
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    email: state.user.getIn(["loggedInfo", "username"])
  }),
  dispatch => ({})
)(ChangePassword);
