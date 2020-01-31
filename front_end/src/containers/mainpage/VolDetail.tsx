import React from 'react';
import { RouteComponentProps } from 'react-router-dom'

import "assets/css/style.scss";
import "assets/css/user.scss";
import "assets/mycss/components.scss";
import "assets/css/common.scss";
import "assets/css/components.css";
import "assets/css/components.scss";
import "assets/mycss/mainpage.scss";

const VolDetail = (props: RouteComponentProps<{ voltitle: string }>) => {
    return (
    <div className="user" id="login">
    <div className="wrapC">
        <h1 className="title">
            <img
             className="titleimg"
             src="/images/volunteer.png"
             />
        </h1>
        <div>
            <h1 className="title">
            {props.match.params.voltitle}
            </h1>
            <div className="list">
                여기에 상세정보가 들어갑니다.
            </div>
        </div>
    </div>
</div>
    )
}

export default VolDetail;