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
  async componentDidMount() {
    const token = storage.get("token");
    const { profileUserId, loginUserId } = this.props;
    this.setState({
      followerList: await UserAPI.getUserFollower(token, profileUserId)
    });
    this.setState({
      followingList: await UserAPI.getUserFollowing(token, profileUserId)
    });
    this.setState({
      isProfileUserFollowedByLoginUser: await UserAPI.checkFollow(
        token,
        loginUserId,
        profileUserId
      )
    });
  }
  componentDidUpdate() {}

  handleFollow = async () => {
    const { token } = storage.get("token");
    const { loginUserId, profileUserId } = this.props;
    await UserAPI.followUser(token, {
      followee_userid: profileUserId,
      follower_userid: loginUserId
    });
    this.setState({
      isProfileUserFollowedByLoginUser: await UserAPI.checkFollow(
        token,
        loginUserId,
        profileUserId
      )
    });
  };
  handleUnfollow = async () => {
    const { token } = storage.get("token");
    const { loginUserId, profileUserId } = this.props;
    console.log("언팔로우");
    await UserAPI.unfollowUser(token, {
      follower_userid: loginUserId,
      followee_userid: profileUserId
    });
    this.setState({
      isProfileUserFollowedByLoginUser: await UserAPI.checkFollow(
        token,
        loginUserId,
        profileUserId
      )
    });
  };
  render() {
    // const userProfile = this.props.userProfile.toJS();
    const { loginUserId, profileUserId } = this.props;
    const {
      followerList,
      followingList,
      isProfileUserFollowedByLoginUser
    } = this.state;
    const { handleFollow, handleUnfollow } = this;
    console.log("로그인한 아이디", loginUserId);
    console.log("아이디", profileUserId);
    console.log("팔로워", followerList);
    console.log("팔로잉", followingList);
    console.log("팔로우중?", isProfileUserFollowedByLoginUser);
    return (
      <div className="user-profile">
        <div>
          아이디 : {profileUserId}/ 팔로워 : {followerList} 명 / 팔로잉 :{" "}
          {followingList} 명
        </div>
        {loginUserId !== profileUserId && !isProfileUserFollowedByLoginUser && (
          <ActionButton action={handleFollow} placeholder="팔로우" />
        )}
        {loginUserId !== profileUserId && isProfileUserFollowedByLoginUser && (
          <ActionButton action={handleUnfollow} placeholder="팔로우 취소" />
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
