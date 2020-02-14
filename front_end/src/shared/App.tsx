import React, { Component } from "react";
import { Route } from "react-router-dom";
// import Login from "containers/login/Login2";
import Login from "containers/login/Login";
import Join from "containers/join/Join";
import FindPassword from "containers/findPassword/FindPassword";
import JoinComplete from "containers/join/JoinComplete";
import MailReSend from "containers/mailresend/MailReSend";
import FindPasswordMailSend from "containers/findPassword/FindPasswordMailSend";
import Calendar from "components/Calendar/Calendar";
import Location from "containers/location/Location";
import MainPage from "containers/mainpage/MainPage";
import VolDetail from "containers/mainpage/VolDetail";
import PostingForm from "containers/posting/PostForm";
import CalendarContainer from "containers/calendar/CalendarContainer";
import SearchContainer from "containers/usersetting/SearchContainer";
// import Postings from "containers/posting/Postings"

import Wall from "containers/posting/Wall";
import Main from "containers/main/Main";
import Header from "components/header/Header";
import Post from "containers/posting/Post"
import UserProfile from "containers/temp/temp";
// 직접 만든 component
import TemporaryDrawer from "components/navi/TemporaryDrawer";
import TodosContainer from "containers/usersetting/SearchContainer";
// 로컬에 저장
import storage from "lib/storage";
// redux 관련
import * as userActions from "redux/modules/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import jwt from "jsonwebtoken";
import { setPreferInfo } from '../redux/modules/user';
class App extends Component<any> {
  initializeUserInfo = async () => {
    const token = storage.get("token"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!token) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    console.log("token", token);
    const temp = jwt.decode(token);
    console.log("temp", temp);
    const { UserActions, history } = this.props;

    await UserActions.setLoggedInfo(temp);



    // history.push("/mainpage");
  };
  initialLoad = async (userId: string) => {
    const { UserActions } = this.props;
    console.log(userId)
    await UserActions.setPreferInfo(userId)
  }
  shouldComponentUpdate(nextProps: any) {
    const { userId } = this.props
    console.log("tihs.props", this.props);
    console.log("nextProps", nextProps);
    const userId2 = nextProps.userId
    console.log("userid의 변화", userId, userId2)
    if (userId !== userId2) {
      this.initialLoad(userId2)
    }
    return (userId === userId2)
  }
  constructor(props: any) {
    super(props)
    this.initializeUserInfo();

    console.log("constructor입니다!!!")
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <div>
          {/* <TemporaryDrawer /> */}
          {/* <div className="wrapC"> */}
          {/* <Route path="/" component={Header} /> */}
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/join" component={Join} />
          <Route path="/findpassword" component={FindPassword} />
          <Route
            path="/findpasswordmailsend"
            component={FindPasswordMailSend}
          />
          <Route path="/join/complete" component={JoinComplete} />
          <Route path="/mailresend" component={MailReSend} />
          <Route path="/calendar" component={CalendarContainer} />
          <Route exact path="/mainpage" component={MainPage} />
          <Route
            exact
            path="/mainpage/detail/:voltitle"
            component={VolDetail}
          />
          <Route path="/location" component={Location} />
          <Route exact path="/vol/:id/detail" component={VolDetail} />
          <Route exact path="/vol/:id/write" component={PostingForm} />
          <Route exact path="/list" component={Wall} />
          <Route exact path="/vol/detail/:id" component={VolDetail} />
          <Route exact path="/write" component={PostingForm} />
          <Route exact path="/usersetting" component={SearchContainer} />
          {/* <Route exact path="/list" component={Post} /> */}
          <Route exact path="/userprofile" component={UserProfile} />
        </div>
        <Header />
      </div>
      // </div>
    );
  }
}

export default connect(
  ({ user }: any) => ({
    userId: user.getIn(['loggedInfo', 'userId']),
    preferInfo: user.getIn(['loggedInfo', 'preferInfo'])
  }), dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  }))(App);
// export default connect(
//   (state: any) => ({
//     // props로 받아오는 정보들...
//     form: state.auth.getIn(["login", "form"]),
//     error: state.auth.getIn(["login", "error"]),
//     result: state.auth.get("result"),
//     logged: state.user.get("logged"),
//     loggedInfo: state.user.get("loggedInfo"),
//     initialNumber: state.base.get("initialNumber")
//   }),
//   dispatch => ({
//     AuthActions: bindActionCreators(authActions, dispatch),
//     UserActions: bindActionCreators(userActions, dispatch),
//     BaseActions: bindActionCreators(baseActions, dispatch)
//   })
// ) (Login);