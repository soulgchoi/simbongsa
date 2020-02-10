import React, { Component } from "react";
import VolList from "./VolList";


import "assets/css/style.scss";
import "assets/css/user.scss";
import "assets/mycss/components.scss";
import "assets/css/common.scss";
import "assets/css/components.css";
import "assets/css/components.scss";
import "assets/mycss/mainpage.scss";


export default class MainPage extends Component {

    render() {
        return (
            <div className="user" id="login">
                <div className="wrapC">
                    <div>
                        <img
                            className="titleimg"
                            src="/images/volunteer.png"
                        />
                        <h1 className="title titleheader">
                            최신 봉사활동 정보
                </h1></div>
                    <div>
                        <VolList />
                    </div>
                </div>
            </div>
        );
    }
}