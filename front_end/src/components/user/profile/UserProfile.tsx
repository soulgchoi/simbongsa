import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "redux/modules/user";
import * as UserAPI from "lib/api/UserApi";
import { Container, Image } from 'semantic-ui-react'
import ActionButton from "components/button/ActionButton";
import profile_default from 'assets/images/profile_default.png';

import "./UserProfile.scss"

interface Props {
  UserActions: any;
  profileUserId: string; // 프로필을 표시할 유저 아이디
  loginUserId: string; // 현재 로그인한 유저의 아이디, 자동으로 세팅된다.
  userProfileMap : any; // 현재 표시중인 모든 유저들의 프로필 정보를 저장한 맵. key : 유저아이디, value : 팔로워, 팔로잉, 현재팔로우중여부
  history : any;
}
enum page {
  PROFILE,
  FOLLOWER,
  FOLLOWING
}
interface State {
  showPage: page;
}

class UserProfile extends Component<Props, State> {
  state = {
    showPage: page.PROFILE
  };
  constructor(props:any) {
    super(props);
    this.setProfile();
  }

  setProfile = async () => {
    const { profileUserId, loginUserId, UserActions, userProfileMap } = this.props;
    if(typeof userProfileMap.get(profileUserId) === 'undefined'){
      await UserActions.setUserFollowerList(profileUserId);
      await UserActions.setUserFollowingList(profileUserId);
      await UserActions.setUserFollowTag(loginUserId, profileUserId);
      await UserActions.setUserProfileImage(profileUserId);
    }
  }
  updateProfile = async () => {
    const { profileUserId, UserActions } = this.props;
    await UserActions.setUserFollowerList(profileUserId);
    await UserActions.setUserFollowingList(profileUserId);
  };

  handleFollow = async () => {
    const { loginUserId, profileUserId, UserActions} = this.props;
    await UserActions.followUser(loginUserId, profileUserId);
    this.updateProfile();
  };
  handleUnfollow = async () => {
    const { loginUserId, profileUserId, UserActions } = this.props;
    await UserActions.unfollowUser(loginUserId, profileUserId);
    this.updateProfile();
  };
  handleFollowingClick = (e: any) => {
    // this.setState({ showPage: page.FOLLOWING });
  };
  handleFollowerClick = (e: any) => {
    // this.setState({ showPage: page.FOLLOWER });
  };

  shouldComponentUpdate(nextProps : any){
    const {profileUserId} = this.props;
    const {userProfileMap} = nextProps;
    return typeof userProfileMap.get(profileUserId) !== 'undefined' && userProfileMap.get(profileUserId).size === 4;
  }

  handleIdClick = (e : any) =>{
    const { history, profileUserId } = this.props;
    history.push(`/user/${profileUserId}`);
  }

  render() {
    const { loginUserId, profileUserId, userProfileMap } = this.props;
    
    // 첫 렌더링때 아직 유저프로필 맵이 세팅 안된 상태에서 우선 빈화면 출력
    if(typeof userProfileMap.get(profileUserId) === 'undefined'){
      return(<div></div>);
    }
    const followerList = userProfileMap.get(profileUserId).get('followerList');
    const followingList = userProfileMap.get(profileUserId).get('followingList');
    const isProfileUserFollowedByLoginUser = userProfileMap.get(profileUserId).get('isProfileUserFollowedByLoginUser');
    const profileImage = userProfileMap.get(profileUserId).get('profileImage');
    const profileImageFlag = profileImage.split(`${process.env.REACT_APP_REST_BASE_API}/uploads/`)[1];
    // let followerList = [], followingList = [],  isProfileUserFollowedByLoginUser = false;
    const {
      handleFollow,
      handleUnfollow,
      handleFollowingClick,
      handleFollowerClick
    } = this;
    return (
      <div className="user-profile">
        {/* {showPage === page.PROFILE && ( */}
          <div>
            <div id="userId" onClick={this.handleIdClick} >
            <Image src={profileImageFlag!=="null"?profileImage:profile_default} avatar/>
            {profileUserId}
            </div>
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
         {/* )} */}
      </div>
    );
  }
}

export default withRouter(connect(
  ({ user }: any, ownProps : any) => {
    return {
      loginUserId: user.getIn(["loggedInfo", "userId"]),
      userProfileMap : user.get("userProfileMap"),
      profileUserId : ownProps.profileUserId,
    };
  },
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(UserProfile));
