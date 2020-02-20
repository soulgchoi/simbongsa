import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "redux/modules/search";
import * as userActions from "redux/modules/user";
import "./SearchContainer.css"
import {
  AgeContainer,
  CategoryContainer,
  LocationContainer,
  TimeContainer
} from "containers/usersetting";
import { useRadioGroup } from "@material-ui/core";

import { localPreferInfo } from "lib/api/UserApi";
import { setPreferInfo } from "../../redux/modules/user";
import { Container, Button, Grid } from "semantic-ui-react";
interface Iprops {
  locations: any;
  categorys: any;
  times: any;
  ages: any;
  SearchActions: any;
  UserActions: any;
  history: any;
  isRegister: boolean
  userId: string
}
class SearchContainer extends Component<any, any> {
  handleLocalRegister = async () => {

    const {
      locations,
      categorys,
      times,
      ages,
      UserActions,
      SearchActions,
      history,
      userId,
      isRegister
    } = this.props;
    if (isRegister) {
      console.log("locations", locations.toJS());
      console.log("categorys", categorys.toJS());
      console.log("times", times.toJS());
      console.log("ages", ages.toJS());
      const preferRegion = locations.toJS().map((location: any) => location.key);
      console.log("preferRegion", preferRegion);
      const preferCategory = categorys
        .toJS()
        .map((category: any) => category.key);
      console.log("preferCategory", preferCategory);
      let age = "";
      let bgnTm = "";
      let endTm = "";
      if (ages.toJS().adult === true) {
        age = "1992-01-01";
      } else if (ages.toJS().youth === true) {
        age = "2005-01-01";
      }
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
      console.log("age", age);
      console.log("시간", bgnTm, endTm);
      // if (times.)
      // if (error === true) return; // 현재 에러가 있는 상태라면 진행하지 않음

      try {
        await SearchActions.preferRegister({
          age: age,
          bgnTm: bgnTm,
          endTm: endTm,
          preferRegion: preferRegion,
          preferCategory: preferCategory,
          userId: userId
        });
        console.log("왓다");
        // const loggedInfo = this.props.result.toJS();
        // console.log("로그인", loggedInfo);
        // // TODO: 로그인 정보 저장 (로컬스토리지/스토어)
        // storage.set("loggedInfo", loggedInfo);
        // UserActions.setLoggedInfo(loggedInfo);
        UserActions.setValidated(true);
        history.push("/mainpage"); // 회원가입 성공시 홈페이지로 이동
      }
      catch (e) {
        // TODO: 실패시 실패 ERROR 표현
        // if (e.response.status === 409) {
        //   const { key } = e.response.data;
        //   return this.setError(message, key);
      }
    }
    else {

    }
  };
  render() {
    console.log("여기는 search");
    const { handleLocalRegister } = this;
    const { isRegister, locations,
      categorys,
      times,
      ages, } = this.props
    console.log("locations", locations.toJS());
    console.log("categorys", categorys.toJS());
    console.log("times", times.toJS());
    console.log("ages", ages.toJS());
    return (
      <Fragment>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <h1>선호지역</h1>
                <LocationContainer />
              </Grid.Column>
              <Grid.Column width={16}>
                <h1>선호 시간대</h1>
                <TimeContainer />

              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={16}>
                <h1>선호 봉사</h1>
                <CategoryContainer />

              </Grid.Column>
              <Grid.Column width={16}>
                <h1>나이</h1>
                <AgeContainer />
              </Grid.Column>
            </Grid.Row>
          </Grid>








          <div style={{ justifyContent: 'center', display: 'flex' }}>
            {isRegister && <Button onClick={handleLocalRegister} color='orange'>저장하기</Button>}
            {/* {!isRegister && <Button onClick={handleLocalRegister} color='green'>설정하기</Button>} */}
          </div>


        </Container>
      </Fragment>
    );
  }
}

export default connect(
  ({ search, user }: any) => ({
    locations: search.get("locations"),
    categorys: search.get("categorys"),
    times: search.get("times"),
    ages: search.get("ages"),
    userId: user.get("loggedInfo").get("userId"),
    preferInfo: user.getIn(["loggedInfo", "preferInfo"]),
    isRegister: search.get('isRegister')
  }),
  dispatch => ({
    SearchActions: bindActionCreators(searchActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(SearchContainer);
