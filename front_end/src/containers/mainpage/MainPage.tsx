import React, { Component } from "react";
import Tab from "containers/mainpage/Tab"
import SearchBar from "components/search/SearchBar"
import "assets/mycss/mainpage.scss";

export default class MainPage extends Component {
  render() {

    return (
      <div>
        <div>
          <img
            alt="타이틀"
            className="titleimg"
            src="/images/volunteer.png"
          />
          <h3 className="title titleheader">최신 봉사활동 정보</h3>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <Tab />
        </div>
      </div>
    );
  }
}
