import React from "react";
import SearchContainer from "containers/usersetting/SearchContainer";
import Withdraw from "containers/usersetting/Withdraw";
import Profile from "containers/usersetting/Profile";
import ChangePassword from "containers/usersetting/ChangePassword";
import { Tab } from "semantic-ui-react";

const panes = [
  {
    menuItem: "프로필",
    render: () => (
      <Tab.Pane>
        <Profile />
      </Tab.Pane>
    )
  },
  {
    menuItem: "선호 봉사",
    render: () => (
      <Tab.Pane>
        <SearchContainer />
      </Tab.Pane>
    )
  },
  {
    menuItem: "비밀번호",
    render: () => (
      <Tab.Pane>
        <ChangePassword />
      </Tab.Pane>
    )
  },
  {
    menuItem: "회원탈퇴",
    render: () => (
      <Tab.Pane>
        <Withdraw />
      </Tab.Pane>
    )
  }
];

const UserSettingTab = () => (
  <Tab
    menu={{ fluid: true, vertical: true, tabular: true }}
    grid={{ paneWidth: 13, tabWidth: 3 }}
    panes={panes}
  />
);

export default UserSettingTab;
