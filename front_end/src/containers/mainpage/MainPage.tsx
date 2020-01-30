import React, { Component } from "react";
import VolList from "./VolList";


import "assets/css/style.scss";
import "assets/css/user.scss";
import "assets/mycss/components.scss";
import "assets/css/common.scss"
import "assets/css/components.css"
import "assets/css/components.scss"

export default class MainPage extends Component {
    render() {
        return (
            <div className="user" id="login">
            <div className="wrapC">
                <h1 className="title">
                    봉사활동 리스트
                </h1>
                <div>
                    <VolList/>
                </div>
            </div>
            </div>
        );
    }
}