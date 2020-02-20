import React, { Component } from "react";
import SearchContainer from "containers/usersetting/SearchContainer";
import LinkButton from "components/button/LinkButton";
interface Props {}
interface State {}

export default class UserSettingPage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <SearchContainer />
        <LinkButton link="/withdraw" placeholder="회원 탈퇴" />
      </div>
    );
  }
}
