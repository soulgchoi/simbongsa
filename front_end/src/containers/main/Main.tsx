import React, { ReactElement } from "react";
import "assets/mycss";

import VolList from "containers/mainpage/VolList";
import Logo from "assets/images/logo.png";
import LinkButton from "components/button/LinkButton";

interface Props {}

export default function main({}: Props): ReactElement {
  return (
    <div className="user" id="login">
      <div className="wrapC">
        <div className="image">
          <img alt="로고" src={Logo} width="25%" height="25%" />
        </div>
        <LinkButton placeholder="달력" link="/calendar" />
        <LinkButton placeholder="지도" link="/location" />
        {/* <VolList /> */}
      </div>
    </div>
  );
}
