import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";
import * as UserAPI from "lib/api/UserApi";

import FollowList from "components/user/profile/FollowList";
import ActionButton from "components/button/ActionButton";

import "./PostUser.css"
// import "assets/mycss";

interface Props {
  UserActions: typeof userActions;
  profileUserId: string; // 프로필을 표시할 유저 아이디
  userProfile: any;
  loginUserId: string; // 현재 로그인한 유저의 아이디, 자동으로 세팅된다.
}
enum page {
  PROFILE,
  FOLLOWER,
  FOLLOWING
}
interface State {
  followerList: string[];
  followingList: string[];
  isProfileUserFollowedByLoginUser: boolean;
  showPage: page;
}

class PostUser extends Component<Props, State> {
  state = {
    followerList: [],
    followingList: [],
    isProfileUserFollowedByLoginUser: false,
    showPage: page.PROFILE
  };
  componentDidMount() {
    this.updateProfile();
  }
  updateProfile = async () => {
    const { profileUserId, loginUserId } = this.props;
    this.setState({
      followerList: await UserAPI.getUserFollower(profileUserId)
    });
    this.setState({
      followingList: await UserAPI.getUserFollowing(profileUserId)
    });
    this.setState({
      isProfileUserFollowedByLoginUser: await UserAPI.checkFollow(
        loginUserId,
        profileUserId
      )
    });
  };

  handleFollow = async () => {
    const { loginUserId, profileUserId } = this.props;
    await UserAPI.followUser({
      followee_userid: profileUserId,
      follower_userid: loginUserId
    });
    this.updateProfile();
  };
  handleUnfollow = async () => {
    const { loginUserId, profileUserId } = this.props;
    console.log("언팔로우");
    await UserAPI.unfollowUser({
      follower_userid: loginUserId,
      followee_userid: profileUserId
    });
    this.updateProfile();
  };
  handleFollowingClick = (e: any) => {
    this.setState({ showPage: page.FOLLOWING });
  };
  handleFollowerClick = (e: any) => {
    this.setState({ showPage: page.FOLLOWER });
  };
  render() {
    const { loginUserId, profileUserId } = this.props;
    const {
      followerList,
      followingList,
      isProfileUserFollowedByLoginUser,
      showPage
    } = this.state;
    const {
      handleFollow,
      handleUnfollow,
      handleFollowingClick,
      handleFollowerClick
    } = this;
    return (
      <div className="user-profile">
        {showPage === page.PROFILE && (
          <div>
            <div>
            <div style={{ display:"inline"}} onClick={handleFollowerClick}>
              <span>팔로워 </span> <span style={{ fontWeight:"bold" }}>{followerList.length}</span>
            </div>
            <div style={{ display:"inline"}} onClick={handleFollowingClick}>
            <span>팔로잉</span> <span style={{ fontWeight:"bold" }}>{followingList.length}</span>
            </div>
            </div>
            {loginUserId !== profileUserId &&
              !isProfileUserFollowedByLoginUser && (
                <ActionButton action={handleFollow} placeholder="팔로우" />
              )}
            {loginUserId !== profileUserId &&
              isProfileUserFollowedByLoginUser && (
                <ActionButton
                  action={handleUnfollow}
                  placeholder="팔로우 취소"
                />
              )}
        
          </div>
        )}
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
)(PostUser);
