import React, { Component } from "react";
import UserProfile from "components/user/profile/UserProfile";

interface Props {}
interface State {}

export default class temp extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <UserProfile userId={"limhaksu3"} />
      </div>
    );
  }
}
