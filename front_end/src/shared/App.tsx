import React, { Component } from "react";
import Router from './Router'
import { Grid, Segment, Dimmer, Loader } from "semantic-ui-react";
import { List } from "immutable"

// 로컬에 저장
import storage from "lib/storage";
// redux 관련
import * as userActions from "redux/modules/user";
import * as searchActions from "redux/modules/search";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import jwt from "jsonwebtoken";
// json 관련
import locationAllList from "lib/json/temp.json";
import categoryAllList from "lib/json/searchCategory.json";

import { Container, Image } from 'semantic-ui-react'
import * as volActions from 'redux/modules/vol';
interface IProps {
  UserActions: typeof userActions
  VolActions: typeof volActions
  SearchActions: typeof searchActions
  userId: string
  preferInfo: any
  input: string
  locations: List<any>
  categorys: List<any>
  times: any
  loading: boolean
}
class App extends Component<IProps> {
  initializeUserInfo = async () => {
    const token = storage.get("token"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!token) return; // 로그인 정보가 없다면 여기서 멈춥니다.
    console.log("token", token);
    const temp = jwt.decode(token);
    console.log("temp", temp);
    const { UserActions, loading } = this.props;
    console.log("시작")

    await UserActions.setLoggedInfo(temp);

    const { userId } = this.props
    console.log("userId", userId)
    await UserActions.setPreferInfo(userId);
    const { preferInfo } = this.props
    console.log("preferInfo", preferInfo)
    this.initializePreferInfo(preferInfo)

    await this.initialSearch()

    // history.push("/mainpage");
  };
  initialSearch = () => {
    const { input, VolActions, locations, categorys, times } = this.props
    let preferLocate = locations.toJS().map((location: any) => location.text)
    console.log(preferLocate)
    let preferCategory = categorys.toJS().map((category: any) => category.text)
    const locateSize = preferLocate.length
    const categorySize = preferCategory.length
    console.log(locateSize)
    for (let i = 0; i < 3 - locateSize; i++) {
      preferLocate.push("null null")
      console.log("for문")
    }
    for (let i = 0; i < 3 - categorySize; i++) {
      preferCategory.push(null)
    }
    console.log("preferLocate", preferLocate)
    console.log("preferCategory", preferCategory)
    const firstLocation = preferLocate[0].split(" ")
    const secondLocation = preferLocate[1].split(" ")
    const thirdLocation = preferLocate[2].split(" ")

    const firstCategory = preferCategory[0]
    console.log(firstCategory)
    const secondCategory = preferCategory[1]
    const thirdCategory = preferCategory[2]

    let bgnTm = "";
    let endTm = "";

    if (times.toJS().morning === true) {
      bgnTm = "00:00:00";
    } else if (times.toJS().morning === false) {
      bgnTm = "12:00:01";
    }
    if (times.toJS().afternoon === true) {
      endTm = "23:59:59";
    } else if (times.toJS().afternoon === false) {
      endTm = "12:00:00";
    }
    if (times.toJS().afternoon === false && times.toJS().morning === false) {
      bgnTm = "00:00:01";
      endTm = "23:59:58";
    }
    VolActions.getVolList({ input: input, firstLocation: firstLocation, secondLocation: secondLocation, thirdLocation: thirdLocation, firstCategory: firstCategory, secondCategory: secondCategory, thirdCategory: thirdCategory, bgnTm: bgnTm, endTm: endTm })
    VolActions.getInitailList({ input: input, firstLocation: firstLocation, secondLocation: secondLocation, thirdLocation: thirdLocation, firstCategory: firstCategory, secondCategory: secondCategory, thirdCategory: thirdCategory, bgnTm: bgnTm, endTm: endTm, pageNum: 1 })
  }
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
        const number: keyof typeof categoryAllList = info.preferCategory[j]
        SearchActions.insert({
          form: "category",
          text: categoryAllList[number],
          key: number
        });
      }
    }
  }



  initialLoad = (userId: string) => {
    const { UserActions } = this.props;
    console.log(userId);
    UserActions.setPreferInfo(userId);
  };
  // shouldComponentUpdate(nextProps: any) {
  //   const { userId } = this.props;
  //   console.log("tihs.props", this.props);
  //   console.log("nextProps", nextProps);
  //   const userId2 = nextProps.userId;
  //   console.log("userid의 변화", userId, userId2);
  //   if (userId !== userId2) {
  //     this.initialLoad(userId2);
  //   }
  //   const { preferInfo } = this.props;
  //   const preferInfo2 = nextProps.preferInfo;
  //   if (userId === userId2) {
  //     console.log("preferInfo의 변화", preferInfo, preferInfo2);
  //     if (preferInfo !== preferInfo2) {
  //       this.initializePreferInfo(preferInfo2);
  //     }
  //   }
  //   return userId === userId2 && preferInfo === preferInfo2;
  // }
  constructor(props: any) {
    super(props);
    this.initializeUserInfo();
  }

  render() {
    const { loading } = this.props;
    return (
        <div style={{ marginTop: "2.85714286em"}}>
        <Segment style={{marginBottom: "3em"}}>
          {loading && (
            <Dimmer active inverted>
              <Loader>로딩중</Loader>
            </Dimmer>
          )}
          <Container>
            <Router />
          </Container>
        </Segment>
        </div>
    );
  }
}

export default connect(
  ({ user, vol, search }: any) => ({
    userId: user.getIn(["loggedInfo", "userId"]),
    preferInfo: user.getIn(["loggedInfo", "preferInfo"]),
    volunteers: vol.get("volunteers"), // store에 있는 state를 this.pros로 연결
    input: search.get("input"),
    loading: user.get('loading'),
    locations: search.get("locations"),
    categorys: search.get("categorys"),
    times: search.get("times"),
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch),
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(App);
