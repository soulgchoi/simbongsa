import React from "react";
import { Link } from "react-router-dom";
import "assets/css/style.scss";
import "assets/css/user.scss";
interface Iprops {
  location: {
    state: {
      email: "string";
    };
  };
}
interface IState {
  email: string;
}

class JoinComplete extends React.Component<Iprops, IState> {
  state = {
    email: ""
  };
  componentDidMount() {
    console.log(this.props);
    this.setState({ email: this.props.location.state.email });
  }
  render() {
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

export default JoinComplete;
