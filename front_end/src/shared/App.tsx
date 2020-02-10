import React, { Component } from "react";
import { Route } from "react-router-dom";
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
import PostingForm from "containers/posting/PostingForm";
// import PostingItem from "containers/posting/PostingItem";
import CalendarContainer from "containers/calendar/CalendarContainer";
import UserSetting from "containers/usersetting/UserSetting"
// import Postings from "containers/posting/Postings"

// 직접 만든 component
import TemporaryDrawer from "components/navi/TemporaryDrawer";
import TodosContainer from "containers/usersetting/TodosContainer";
// 로컬에 저장
import storage from 'lib/storage'
// redux 관련
import * as userActions from 'redux/modules/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwt from 'jsonwebtoken'
class App extends Component<any>{
  initializeUserInfo = () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    console.log('loggedInfo', loggedInfo)
    const temp = jwt.decode(loggedInfo.token)
    console.log('temp', temp)
    const { UserActions, history } = this.props;

    UserActions.setLoggedInfo(temp);
    // history.push("/mainpage");
  }
  componentDidMount() {
    this.initializeUserInfo();
  }
  render() {
    return (
      <div>
        <TemporaryDrawer />
        <Route exact path="/" component={Login} />
        <Route exact path="/join" component={Join} />
        <Route path="/findpassword" component={FindPassword} />
        <Route path="/findpasswordmailsend" component={FindPasswordMailSend} />
        <Route path="/join/complete" component={JoinComplete} />
        <Route path="/mailresend" component={MailReSend} />
        <Route path="/calendar" component={CalendarContainer} />
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/mainpage/detail/:voltitle" component={VolDetail} />
        <Route path="/location" component={Location} />
        <Route exact path="/vol/detail/:id" component={VolDetail} />
        <Route exact path="/write" component={PostingForm} />
        <Route exact path="/setting" component={UserSetting} />
        <Route exact path="/setting2" component={TodosContainer} />

      </div >
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);
