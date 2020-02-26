import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Link } from "react-router-dom";
// import "assets/css/style.scss";
// import "assets/css/user.scss";
// import "assets/mycss/error.scss";

interface IProps {
  location: {
    state: {
      email: "string";
    };
  };
}
interface IState { }

class FindPasswordMailSend extends React.Component<
  IProps,
  IState,
  RouteComponentProps
  > {
  state = {
    email: null
  };
  componentWillReceiveProps() {
    this.setState({ email: this.props.location.state.email });
  }
  componentDidMount() {
    this.setState({ email: this.props.location.state.email });
  }
  render() {
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <h1 className="title">비밀번호 재설정 메일 전송</h1>
          <div className="input-with-label">
            <h3>
              비밀번호 재설정 메일을 다시 보냈습니다. 메일함을 확인해 주세요.
            </h3>
          </div>
          <Link
            to={{
              pathname: "/mailresend",
              state: { email: this.state.email }
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

export default FindPasswordMailSend;
