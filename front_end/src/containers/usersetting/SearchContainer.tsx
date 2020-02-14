import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from 'redux/modules/search';
import * as userActions from 'redux/modules/user';
import { AgeContainer, CategoryContainer, LocationContainer, TimeContainer } from 'containers/usersetting'
import { useRadioGroup } from "@material-ui/core";

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