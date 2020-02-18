import React, { Component } from "react";
import Router from './Router'
import { Grid } from "semantic-ui-react";


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

import { Container } from 'semantic-ui-react'

class App extends Component<any> {
  initializeUserInfo = async () => {
    const token = storage.get("token"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!token) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    console.log("token", token);
    const temp = jwt.decode(token);
    console.log("temp", temp);
    const { UserActions } = this.props;

    await UserActions.setLoggedInfo(temp);

    // history.push("/mainpage");
  };
  initializePreferInfo = (preferInfo: any) => {
    const { SearchActions } = this.props;
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
        <Container >
          <Router />
        </Container>
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
