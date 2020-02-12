import React, { Component } from "react";
import VolList from "./VolList";

<<<<<<< HEAD

import "assets/css/style.scss";
import "assets/css/user.scss";
import "assets/mycss/components.scss";
import "assets/css/components.css";
import "assets/css/components.scss";
import "assets/mycss/mainpage.scss";

=======
import "assets/mycss";
>>>>>>> ffd8aa3b0680cb7f996d48c1637c78205ef5479b

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
            <VolList />
          </div>
        </div>
      </div>
    );
  }
}
