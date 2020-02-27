import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserApi from 'lib/api/UserApi'
import * as userActions from "redux/modules/user";
import UserProfile from 'components/user/profile/UserProfile';
import { List, Responsive, Container } from 'semantic-ui-react';
interface Props {
    match : any;
    loginUserId : any;
    userProfileMap : any;
}
interface State {
    followerList : string[];
}

class FollowerList extends Component<Props, State> {
    state = { followerList : []}
    componentDidMount(){
        const userId = this.props.match.params.id;
        let returnAxios = UserApi.getUserFollower(userId);
        let followerList = [];
        returnAxios.then(
            (response : any)=>{
                followerList = response.data.data.map((item:any)=>item.m_userid)
                this.setState({followerList : followerList})
            }
        )
    }
    getProfileList(list : string[]){
        return list.map((userId:string)=>{
            return <List.Item style={{height: "70px"}}>
                <UserProfile profileSize="mini" profileUserId={userId} />
            </List.Item>
        })
    }
    render() {
        const { followerList } = this.state;
        const { getProfileList } = this;
        const userId = this.props.match.params.id;
    return (
        <div>
        <UserProfile profileUserId={userId} />
            <Responsive {...Responsive.onlyMobile}>
                {userId} 님의 팔로워 
              <List celled relaxed>
                {getProfileList(followerList)}
              </List>
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <Container style={{width:"700px"}}>
                {userId} 님의 팔로워
              <List celled relaxed>
                {getProfileList(followerList)}
              </List>
              </Container>
            </Responsive>
        </div>
    );
    }
}

export default connect(
    ({ user }: any, ownProps: any) => {
      return {
        loginUserId: user.getIn(["loggedInfo", "userId"]),
      };
    },
    dispatch => ({
      UserActions: bindActionCreators(userActions, dispatch)
    })
  )(FollowerList);