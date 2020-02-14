import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from 'redux/modules/search';
import * as userActions from 'redux/modules/user';
import { AgeContainer, CategoryContainer, LocationContainer, TimeContainer } from 'containers/usersetting'
import { useRadioGroup } from "@material-ui/core";
import locationAllList from "components/usersetting/temp.json"
import categoryAllList from "components/usersetting/temp2.json"
import 'assets/mycss'
import { localPreferInfo } from "lib/api/UserApi";
import { setPreferInfo } from '../../redux/modules/user';
interface Props {
  locations: any
  categorys: any
  times: any
  ages: any
  SearchActions: any
  UserActions: any
  history: any
}
class SearchContainer extends Component<any, any> {
  initializePreferInfo = (preferInfo: any) => {
    const { times, ages, locations, categorys, SearchActions } = this.props;

    const info = preferInfo.toJS()

    // 시간 관련
    if (info.bgnTm === "00:00:00") {
      SearchActions.initialInsert({ form: "times", key: "morning", value: true })
    }
    else {
      SearchActions.initialInsert({ form: "times", key: "morning", value: false })
    }
    if (info.endTm === "23:59:59") {
      SearchActions.initialInsert({ form: "times", key: "afternoon", value: true })
    }
    else {
      SearchActions.initialInsert({ form: "times", key: "afternoon", value: false })
    }
    console.log("Time", times.toJS())
    // 나이 관련
    const today = new Date()
    const year = today.getFullYear();
    if (!info.age) {
      SearchActions.initialInsert({ form: "ages", key: "adult", value: false })
      SearchActions.initialInsert({ form: "ages", key: "youth", value: false })
    }
    else {
      const age = Number(info.age.split("-")[0])
      const result = Math.abs(age - year)
      console.log("초기 year, age", year, age)
      if (result > 18) {
        SearchActions.initialInsert({ form: "ages", key: "adult", value: true })
        SearchActions.initialInsert({ form: "ages", key: "youth", value: false })
      }
      else if (0 < result && result <= 18) {
        SearchActions.initialInsert({ form: "ages", key: "adult", value: false })
        SearchActions.initialInsert({ form: "ages", key: "youth", value: true })
      }
      else {
        SearchActions.initialInsert({ form: "ages", key: "adult", value: false })
        SearchActions.initialInsert({ form: "ages", key: "youth", value: false })
      }
    }
    //지역 관련
    for (let j = 0; j < info.preferRegion.length; j++) {
      for (let i = 0; i < locationAllList.length; i++) {
        console.log("for문 도는중...", "prefer", info.preferRegion[j], "Alllist", locationAllList[i].key)
        if (info.preferRegion[j] === locationAllList[i].key) {
          const splitValue = locationAllList[i].value.split('/')
          console.log(splitValue[1], splitValue[0])
          SearchActions.insert({ form: "location", text: splitValue[1], key: splitValue[0] })
          break
        }
      }
    };

    // 봉사활동 카테고리 관련
    for (let j = 0; j < info.preferCategory.length; j++) {
      for (let i = 0; i < categoryAllList.length; i++) {
        if (info.preferCategory[j] === categoryAllList[i].key) {
          const splitValue = categoryAllList[i].value.split('/')
          SearchActions.insert({ form: "category", text: splitValue[1], key: splitValue[0] })
        }
      }
    };

  }

  shouldComponentUpdate(nextProps: any) {
    const { preferInfo } = this.props

    const preferInfo2 = nextProps.preferInfo
    console.log("preferInfo의 변화", preferInfo, preferInfo2)
    if (preferInfo !== preferInfo2) {
      this.initializePreferInfo(preferInfo2)
    }
    return (preferInfo === preferInfo2)
  }
  handleLocalRegister = async () => {
    const { locations, categorys, times, ages, UserActions, SearchActions, history, userId } = this.props;
    console.log("locations", locations.toJS())
    console.log("categorys", categorys.toJS())
    console.log("times", times.toJS())
    console.log("ages", ages.toJS())
    const preferRegion = locations.toJS().map((location: any) => location.key)
    console.log("preferRegion", preferRegion)
    const preferCategory = categorys.toJS().map((category: any) => category.key)
    console.log("preferCategory", preferCategory)
    let age = ''
    let bgnTm = ''
    let endTm = ''
    if (ages.toJS().adult === true) {
      age = "1992-01-01"
    }
    else if (ages.toJS().youth === true) {
      age = "2005-01-01"
    }
    if (times.toJS().morning === true) {
      bgnTm = '00:00:00'
    }
    else if (times.toJS().morning === false) {
      bgnTm = '12:00:01'
    }
    if (times.toJS().afternoon === true) {
      endTm = '23:59:59'
    }
    else if (times.toJS().afternoon === false) {
      endTm = '12:00:00'
    }
    if (times.toJS().afternoon === false && times.toJS().morning === false) {
      bgnTm = '00:00:01'
      endTm = '23:59:58'
    }
    console.log("age", age)
    console.log("시간", bgnTm, endTm)
    // if (times.)
    // if (error === true) return; // 현재 에러가 있는 상태라면 진행하지 않음
    try {
      await SearchActions.preferRegister({
        age: age,
        bgnTm: bgnTm,
        endTm: endTm,
        preferRegion: preferRegion,
        preferCategory: preferCategory,
        userId: userId,
      });
      console.log("왓다");
      // const loggedInfo = this.props.result.toJS();
      // console.log("로그인", loggedInfo);
      // // TODO: 로그인 정보 저장 (로컬스토리지/스토어)
      // storage.set("loggedInfo", loggedInfo);
      // UserActions.setLoggedInfo(loggedInfo);
      UserActions.setValidated(true);
      history.push("/mainpage"); // 회원가입 성공시 홈페이지로 이동
    } catch (e) {
      // TODO: 실패시 실패 ERROR 표현
      // if (e.response.status === 409) {
      //   const { key } = e.response.data;
      //   return this.setError(message, key);

    }
  }
  render() {
    console.log("여기는 search")
    const { handleLocalRegister } = this

    return (
      <div>
        <div>
          <h1>선호지역</h1>
          <LocationContainer />
        </div>
        <div>
          <h1>선호 시간대</h1>
          <TimeContainer />
        </div>
        <h1>나이</h1>
        <AgeContainer />
        <div>
          <h1>선호 봉사 종류</h1>
          <CategoryContainer />
        </div>
        <div id='btn-div'>
          <button onClick={handleLocalRegister} className="my--btn">저장하기</button>
        </div>

      </div>
    )
  }
}

export default connect(
  ({ search, user }: any) => ({
    locations: search.get('locations'),
    categorys: search.get('categorys'),
    times: search.get('times'),
    ages: search.get('ages'),
    userId: user.get('loggedInfo').get('userId'),
    preferInfo: user.getIn(['loggedInfo', 'preferInfo'])
  }),
  dispatch => ({
    SearchActions: bindActionCreators(searchActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(SearchContainer);