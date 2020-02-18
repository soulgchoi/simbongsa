import React from "react";
// import "assets/css/style.scss";
// import "assets/css/user.scss";
// import "assets/mycss";
import * as EmailValidator from "email-validator";
// import UserApi from "apis/UserApi";

interface IProps {
  location: {
    state: {
      email: string;
    };
  };
}
interface IState {
  email: string;
  error: {
    email: string;
  };
  isSubmit: boolean;
  component: MailReSend;
}
class MailReSend extends React.Component<IProps, IState> {
  state = {
    email: "",
    error: {
      email: ""
    },
    isSubmit: false,
    component: this
  };
  componentDidMount() {
    console.log(this.props);
    this.setState({ email: this.props.location.state.email }, () =>
      this.checkForm()
    );
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
  // login() {
  //   if (this.state.isSubmit) {
  //     let { email } = this.state;
  //     let data = {
  //       email,
  //       password
  //     };

  //     //요청 후에는 버튼 비활성화
  //     this.isSubmit = false;

  //     UserApi.requestLogin(
  //       data,
  //       res => {
  //         //통신을 통해 전달받은 값 콘솔에 출력
  //         //                        console.log(res);

  //         //요청이 끝나면 버튼 활성화
  //         this.isSubmit = true;
  //       },
  //       error => {
  //         //요청이 끝나면 버튼 활성화
  //         this.isSubmit = true;
  //       }
  //     );
  //   }
  // }
  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value }, () => {
      this.checkForm();
    });
  };
  render() {
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <h1 className="title">메일 재전송</h1>
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

          <button
            disabled={!this.state.isSubmit}
            className="btn btn--back btn--login"
          // onClick={"#"}
          >
            메일 재전송
          </button>
        </div>
      </div>
    );
  }
}

export default MailReSend;
