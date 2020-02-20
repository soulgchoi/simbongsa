import React, { Component, Fragment } from "react";
import Tab from "containers/mainpage/Tab";
import SearchBar from "components/search/SearchBar";
import SearchContainer from "containers/usersetting/SearchContainer";
import ModalForm from "./ModalForm";
import "./MainPage.css";

import {
  Grid,
  Segment,
  Responsive,
  Container,
  Header,
  Icon,
  Image,
  Dimmer,
  Loader,
  GridColumn,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import * as baseActions from "redux/modules/base";
import * as volActions from "redux/modules/vol";
import * as searchActions from "redux/modules/search";
import jwt from "jsonwebtoken";
import storage from "lib/storage";
import { Search } from 'semantic-ui-react';

interface Iprops {
  loading: boolean;
  isRegister: boolean;
  SearchActions: typeof searchActions;
  AuthActions: typeof authActions;
  UserActions: typeof userActions;
  match: any;
  result: any;
  input: string;
  isSearchSubmit: boolean
}
class MainPage extends Component<Iprops> {
  async componentDidMount() {
    const { SearchActions, AuthActions, UserActions } = this.props;
    // const { id_token } = this.props.match.params;
    const hash = window.location.hash;
    if (hash.length > 0) {
      const splitedHash = hash.split("id_token=");
      if (splitedHash.length > 1) {
        const id_token = splitedHash[1].split("&")[0];
        await AuthActions.googleLogin(id_token);
        console.log("메인페이지 마운트", id_token);
        const token = this.props.result.toJS().token;
        const userEmail = jwt.decode(token);
        UserActions.setLoggedInfo(userEmail);
        storage.set("token", token);
      }
    }
    SearchActions.switchSaveButton(false);
  }
  componentWillUnmount() {
    const { SearchActions } = this.props;
    SearchActions.switchSaveButton(true);
  }
  render() {
    const { loading, input, isSearchSubmit } = this.props;
    const result = input + ' 검색결과 입니다.'

    return (
      <Fragment>
        <Container>
          <SearchBar />
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginTop: 10,
              marginBottom: 10,
            }}
            id="divText"
          >
            <div>{isSearchSubmit && input.length > 0 && result}</div><ModalForm />
          </div>
        </Container>
        <Tab />
      </Fragment>
    );
  }
}
export default connect(
  ({ user, auth, search }: any) => {
    return {
      loading: user.get("loading"), // user에 있는 loading
      isRegister: user.get("isRegister"),
      result: auth.get("result"),
      input: search.get("input"),
      isSearchSubmit: search.get("isSearchSubmit"),
    };
  },
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch),
    SearchActions: bindActionCreators(searchActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(MainPage);
