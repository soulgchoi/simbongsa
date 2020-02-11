import React from "react";
import { Link } from "react-router-dom";
// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import "assets/mycss";

interface Iprops {
  location: {
    state: {
      email: "string";
    };
  };
}

class JoinComplete extends React.Component<any, any> {
  render() {
    console.log("form", this.props.form);
    const { email } = this.props.form.toJS();
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <h1 className="title">가입완료</h1>
          <div className="input-with-label">
            <h1>환영합니다.</h1>
          </div>
          <Link
            to={{
              pathname: "/mailresend",
              state: { email: email }
            }}
            className="btn--back"
          >
            <button className="btn btn--back btn--join">
              메일이 도착하지 않았나요?
            </button>
          </Link>
          <Link to={"/"} className="btn--back">
            <button className="btn btn--back btn--join">로그인 화면으로</button>
          </Link>
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
)(JoinComplete);
