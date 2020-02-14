import React, { Component } from "react";
import VolList from "./VolList";
import Tab from "./Tab"
import SearchBar from "./SearchBar"
import "assets/mycss/mainpage.scss";

import "assets/mycss";

export default class MainPage extends Component {
  render() {
    return (
      <div className="user" id="login">
        <div className="wrapC">
          <div>
            <img
              alt="타이틀"
              className="titleimg"
              src="/images/volunteer.png"
            />
            <h1 className="title titleheader">최신 봉사활동 정보</h1>
          </div>
          <div>
            <SearchBar />
          </div>
          <div>
            <Tab />
          </div>
        </div>
      </div>
    );
  }
}
