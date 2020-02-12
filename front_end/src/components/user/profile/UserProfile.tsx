import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";
import * as UserAPI from "lib/api/UserApi";

import FollowList from "components/user/profile/FollowList";
import ActionButton from "components/button/ActionButton";

import storage from "lib/storage";

import "assets/mycss";

interface Props {
  UserActions: typeof userActions;
  profileUserId: string; // 프로필을 표시할 유저 아이디
  userProfile: any;
  loginUserId: string; // 현재 로그인한 유저의 아이디, 자동으로 세팅된다.
}

interface State {
  followerList: string[];
  followingList: string[];
  isProfileUserFollowedByLoginUser: boolean;
}

class UserProfile extends Component<Props, State> {
  state = {
    followerList: [],
    followingList: [],
    isProfileUserFollowedByLoginUser: false
  };
  componentDidMount() {
    const token = storage.get("loggedInfo");
    const { profileUserId, loginUserId } = this.props;
    this.setState({
      followerList: UserAPI.getUserFollower(token, profileUserId)
    });
    this.setState({
      followingList: UserAPI.getUserFollowing(token, profileUserId)
    });
    this.setState({
      isProfileUserFollowedByLoginUser: UserAPI.checkFollow(
        token,
        loginUserId,
        profileUserId
      )
    });
  }
  componentDidUpdate() {
    // console.log("userProfile didUpdate ", profileUserId);
  }

  followHandle = () => {};
  render() {
    // const userProfile = this.props.userProfile.toJS();
    const { loginUserId, profileUserId } = this.props;
    const {
      followerList,
      followingList,
      isProfileUserFollowedByLoginUser
    } = this.state;
    const { followHandle } = this;
    console.log("로그인한 아이디", loginUserId);
    console.log("아이디", profileUserId);
    console.log("팔로워", followerList);
    console.log("팔로잉", followingList);
    return (
      <div className="user-profile">
        <div>
          아이디 : {profileUserId}/ 팔로워 : {followerList} 명 / 팔로잉 :{" "}
          {followingList} 명
        </div>
        {loginUserId !== profileUserId && !isProfileUserFollowedByLoginUser && (
          <ActionButton action={followHandle} placeholder="팔로우" />
        )}
        {loginUserId !== profileUserId && isProfileUserFollowedByLoginUser && (
          <ActionButton action={followHandle} placeholder="팔로우 취소" />
        )}
        <FollowList list={followerList} />
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
