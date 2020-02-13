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
class App extends Component<any> {
  initializeUserInfo = async () => {
    const token = storage.get("token"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    console.log("APP init token", token);
    if (!token) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    console.log("token", token);
    const loggedInfo = jwt.decode(token);
    console.log("loggedInfo", loggedInfo);
    const { UserActions } = this.props;
    await UserActions.setLoggedInfo(loggedInfo);
    // history.push("/mainpage");
  };
  constructor(props: any) {
    super(props);
    this.initializeUserInfo();
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
          <Route exact path="/vol/detail/:id" component={VolDetail} />
          <Route exact path="/write" component={PostingForm} />
          {/* <Route exact path="/list" component={Post} /> */}
          <Route exact path="/userprofile" component={UserProfile} />
        </div>
        <Header />
      </div>
      // </div>
    );
  }
}

export default connect(null, dispatch => ({
  UserActions: bindActionCreators(userActions, dispatch)
}))(App);
