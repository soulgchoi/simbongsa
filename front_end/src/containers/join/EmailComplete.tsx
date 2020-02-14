import React, { Component } from "react";

// redux 관련
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";
import * as UserApi from "lib/api/UserApi";
interface Props {
  match: any;
  emailValidate: boolean;
}
interface State {}

// http://13.124.127.232:8080/A205/email/enter?m_email=pjh5929@naver.com&m_key=m7OSjPN0jpGOTlTCM0QR
class EmailComplete extends Component<Props, State> {
  state = {};

  componentDidMount() {
    const { email, key } = this.props.match.params;
    console.log("email", email);
    console.log("key", key);
    UserApi.emailValidate(email, key);
  }
  render() {
    const { emailValidate } = this.props;
    return (
      <div>
        {emailValidate && <div>메일 인증 완료</div>}
        {!emailValidate && <div>메일 미인증</div>}
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    emailValidate: state.user.get("emailValidate")
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(EmailComplete);
