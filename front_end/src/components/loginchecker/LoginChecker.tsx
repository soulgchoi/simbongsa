import React, { Component } from "react";
import storage from "lib/storage";
interface Props {
  history: any;
}
interface State {}

export default class LoginChecker extends Component<Props, State> {
  state = {};
  componentDidMount() {
    const token = storage.get("token");
    if (
      token === "EmailAuthenticateNeed" ||
      token === "undefined" ||
      token === null
    ) {
      this.props.history.push("/");
    }
  }
  render() {
    return <div></div>;
  }
}
