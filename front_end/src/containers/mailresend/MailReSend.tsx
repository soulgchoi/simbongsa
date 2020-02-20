import React from "react";
import * as EmailValidator from "email-validator";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from 'redux/modules/auth';
import { Map } from 'immutable';
// import UserApi from "apis/UserApi";
import * as AuthApi from 'lib/api/AuthApi'
//debouce 특정 함수가 반복적으로 일어나면, 바로 실행하지 않고, 주어진 시간만큼 쉬어줘야 함수가 실행된다.
import debounce from "lodash/debounce";

interface IProps {
  AuthActions: any;
  location: {
    state: {
      email: string;
    };
  };
  exists: Map<any, any>;
  email: string;
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
    const { email } = this.props;
    console.log(this.props);
    this.setState({ email: email }, () =>
      this.checkForm()
    );
  }
  checkForm = () => {
    let error = { ...this.state.error };
    if (
      this.state.email.length >= 0 &&
      !EmailValidator.validate(this.state.email)
    ) {
      this.setState({ error: { email: "잘못된 이메일 형식 입니다." } });
    } else {
      this.setState({ error: { email: "" } });
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
  setError = (message: any, name: string) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "join",
      message,
      name
    });
  };
  // 중복 체크

  handleSend = async () => {
    try {
      await AuthApi.sendSignupEmail(this.state.email);
    } catch (e) {
      if (e.response.status === 409) {
        const { key } = e.response.data;
        const message = "회원 가입한 이메일이 아닙니다."
        return this.setError(message, key);
      }
    }
  }

  checkEmailExists = debounce(async (email: string) => {
    const { AuthActions } = this.props;
    try {
      console.log("email 체크 함수:", email);
      await AuthActions.checkEmailExists(email);
      console.log("이메일확인결과", this.props.exists.toJS());
      if (this.props.exists.get("email")) {
        this.setState({ error: { email: "" } });
      } else {
        this.setState({ error: { email: "회원 가입한 이메일이 아닙니다." } });
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value }, () => {
      this.checkForm();
      this.checkEmailExists(this.state.email);
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
              onKeyDown={event => {
                if (event.key === "Enter") {
                  this.handleSend();
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

export default connect(
  ({ auth }: any) => ({
    email: auth.getIn(['login', 'form', 'email']),
    form: auth.getIn(["join", "form"]),
    error: auth.getIn(["join", "error"]),
    exists: auth.getIn(["join", "exists"]),
    result: auth.get("result")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(MailReSend);