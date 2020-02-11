import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";

import FollowList from "components/user/profile/FollowList";
import ActionButton from "components/button/ActionButton";

import storage from "lib/storage";

import "assets/mycss";

interface Props {
  UserActions: typeof userActions;
  userId: string; // 프로필을 표시할 유저 아이디
  userProfile: any;
  loginUserId: string; // 현재 로그인한 유저의 아이디, 자동으로 세팅된다.
}

interface State {}

class UserProfile extends Component<Props, State> {
  state = {};
  componentDidUpdate() {
    const token = storage.get("loggedInfo");
    const { UserActions, userId } = this.props;
    console.log("userProfile didUpdate ", userId);
    UserActions.setUserFollowee(userId);
    UserActions.setUserFollower(token, userId);
  }

  followHandle = () => {};
  render() {
    const userProfile = this.props.userProfile.toJS();
    const { loginUserId, userId } = this.props;
    const { followHandle } = this;
    console.log("로그인한 아이디", loginUserId);
    console.log("아이디", userProfile.userId);
    console.log("팔로워", userProfile.followerList.length);
    console.log("팔로잉", userProfile.followingList.length);
    return (
      <div className="user-profile">
        <div>
          아이디 : {userId}/ 팔로워 : {userProfile.followerList.length} 명 /
          팔로잉 : {userProfile.followingList.length} 명
        </div>
        {loginUserId !== userId && (
          <ActionButton action={followHandle} placeholder="팔로우" />
        )}
        <FollowList list={userProfile.followerList} />
      </div>
    );
  }
}

export default connect(
  ({ user }: any) => {
    return {
      userProfile: user.get("userProfile"), // store에 있는 state를 this.pros로 연결
      loginUserId: user.getIn(["loggedInfo", "userId"])
    };
  },
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(UserProfile);
