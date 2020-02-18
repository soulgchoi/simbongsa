import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
// import Login from "containers/login/Login2";
import Login from "containers/login/Login";
import Join from "containers/join/Join";
import FindPassword from "containers/findPassword/FindPassword";
import JoinComplete from "containers/join/JoinComplete";
import MailReSend from "containers/mailresend/MailReSend";
import FindPasswordMailSend from "containers/findPassword/FindPasswordMailSend";
import Calendar from "components/calendar/Calendar";
import Location from "containers/location/Location";
import MainPage from "containers/mainpage/MainPage";
import Intro from "containers/intro/Intro";
import VolDetail from "components/vol/VolDetail";
import PostingForm from "containers/posting/PostForm";
import CalendarContainer from "containers/calendar/CalendarContainer";
import SearchContainer from "containers/usersetting/SearchContainer";
// import Postings from "containers/posting/Postings"
import Feed from "containers/feed/Feed";
import PostingList from "containers/posting/PostingList";
import Mypage from "containers/mypage/Mypage";
import Main from "containers/main/Main";
import Header from "components/header/Header";
import UserProfile from "containers/temp/temp";
import EmailComplete from "containers/join/EmailComplete";
import ChangePassword from "containers/findPassword/FindPasswordMailRecieve";
// 직접 만든 component
import TemporaryDrawer from "components/navi/TemporaryDrawer";
import TodosContainer from "containers/usersetting/SearchContainer";
// 로컬에 저장
import storage from "lib/storage";
// redux 관련
import * as userActions from "redux/modules/user";
import * as searchActions from "redux/modules/search";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import jwt from "jsonwebtoken";
// json 관련
import locationAllList from "components/usersetting/temp.json";
import categoryAllList from "components/usersetting/temp2.json";

import { Container } from "semantic-ui-react";

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
  initializePreferInfo = (preferInfo: any) => {
    const { times, ages, locations, categorys, SearchActions } = this.props;
    if (preferInfo) {
      console.log("preferInfo APP에서", preferInfo.toJS());
      const info = preferInfo.toJS();

      // 시간 관련
      if (info.bgnTm === "00:00:00") {
        SearchActions.initialInsert({
          form: "times",
          key: "morning",
          value: true
        });
      } else {
        SearchActions.initialInsert({
          form: "times",
          key: "morning",
          value: false
        });
      }
      if (info.endTm === "23:59:59") {
        SearchActions.initialInsert({
          form: "times",
          key: "afternoon",
          value: true
        });
      } else {
        SearchActions.initialInsert({
          form: "times",
          key: "afternoon",
          value: false
        });
      }
      // 나이 관련
      const today = new Date();
      const year = today.getFullYear();
      if (!info.age) {
        SearchActions.initialInsert({
          form: "ages",
          key: "adult",
          value: false
        });
        SearchActions.initialInsert({
          form: "ages",
          key: "youth",
          value: false
        });
      } else {
        const age = Number(info.age.split("-")[0]);
        const result = Math.abs(age - year);
        console.log("초기 year, age", year, age);
        if (result > 18) {
          SearchActions.initialInsert({
            form: "ages",
            key: "adult",
            value: true
          });
          SearchActions.initialInsert({
            form: "ages",
            key: "youth",
            value: false
          });
        } else if (0 < result && result <= 18) {
          SearchActions.initialInsert({
            form: "ages",
            key: "adult",
            value: false
          });
          SearchActions.initialInsert({
            form: "ages",
            key: "youth",
            value: true
          });
        } else {
          SearchActions.initialInsert({
            form: "ages",
            key: "adult",
            value: false
          });
          SearchActions.initialInsert({
            form: "ages",
            key: "youth",
            value: false
          });
        }
      }

      for (let j = 0; j < info.preferRegion.length; j++) {
        //지역 관련
        console.log("for문 도는중");
        const splitValue = locationAllList[
          info.preferRegion[j] - 1
        ].value.split("/");
        console.log(splitValue[1], splitValue[0]);
        SearchActions.insert({
          form: "location",
          text: splitValue[1],
          key: splitValue[0]
        });
      }

      // 봉사활동 카테고리 관련
      for (let j = 0; j < info.preferCategory.length; j++) {
        for (let i = 0; i < categoryAllList.length; i++) {
          if (info.preferCategory[j] === categoryAllList[i].key) {
            const splitValue = categoryAllList[i].value.split("/");
            SearchActions.insert({
              form: "category",
              text: splitValue[1],
              key: splitValue[0]
            });
          }
        }
      }
    }
  };

  initialLoad = (userId: string) => {
    const { UserActions } = this.props;
    console.log(userId);
    UserActions.setPreferInfo(userId);
  };
  shouldComponentUpdate(nextProps: any) {
    const { userId } = this.props;
    console.log("tihs.props", this.props);
    console.log("nextProps", nextProps);
    const userId2 = nextProps.userId;
    console.log("userid의 변화", userId, userId2);
    if (userId !== userId2) {
      this.initialLoad(userId2);
    }
    const { preferInfo } = this.props;
    const preferInfo2 = nextProps.preferInfo;
    if (userId === userId2) {
      console.log("preferInfo의 변화", preferInfo, preferInfo2);
      if (preferInfo !== preferInfo2) {
        this.initializePreferInfo(preferInfo2);
      }
    }
    return userId === userId2 && preferInfo === preferInfo2;
  }
  constructor(props: any) {
    super(props);
    this.initializeUserInfo();
  }

  render() {
    return (
      <div>
        <div>
          <Grid reversed="mobile vertically">
            <Grid.Row>
              <Grid.Column style={{ height: "5vh" }}>
                <Header />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ height: "95vh" }}>
                {/* 여기에 라우트 합니다. */}
                {/* <TemporaryDrawer /> */}
                {/* <div className="wrapC"> */}
                {/* <Route path="/" component={Header} /> */}
                <Route exact path="/" component={Login} />
                <Route exact path="/main" component={Intro} />
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
                <Route path="/intro" component={Intro} />
                <Route path="/location" component={Location} />
                <Route exact path="/vol/:id/detail" component={VolDetail} />
                <Route exact path="/vol/:id/write" component={PostingForm} />
                <Route exact path="/:id/list" component={PostingList} />
                {/* <Route exact path="/vol/detail/:id" component={VolDetail} /> */}
                <Route exact path="/write" component={PostingForm} />
                <Route exact path="/usersetting" component={SearchContainer} />
                {/* <Route exact path="/list" component={Post} /> */}
                <Route exact path="/userprofile" component={UserProfile} />
                <Route path="/email/:email/:key" component={EmailComplete} />
                <Route
                  path="/changepassword/:token"
                  component={ChangePassword}
                />
                <Route path="/mypage" component={Mypage} />
                <Route path="/feed" component={Feed} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ user }: any) => ({
    userId: user.getIn(["loggedInfo", "userId"]),
    preferInfo: user.getIn(["loggedInfo", "preferInfo"])
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch)
  })
)(App);
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
