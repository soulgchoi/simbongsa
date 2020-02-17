import React, { Component, Fragment } from "react";
import Tab from "containers/mainpage/Tab"
import SearchBar from "components/search/SearchBar"
import SearchContainer from 'containers/usersetting/SearchContainer';
import ModalForm from './ModalForm'
import { Grid, Segment, Responsive } from 'semantic-ui-react'
export default class MainPage extends Component {
  render() {

    return (
      <Fragment>

        <img
          alt="타이틀"
          className="titleimg"
          src="/images/volunteer.png"
        />
        <h3 className="title titleheader">최신 봉사활동 정보</h3>

        <SearchBar />
        <ModalForm />


        <Tab />

      </Fragment>
    );
  }
}




