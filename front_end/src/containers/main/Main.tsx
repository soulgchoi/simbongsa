import React, { ReactElement } from "react";
import "assets/mycss";

import Logo from "assets/images/logo.png";
import LinkButton from "components/button/LinkButton";

interface Props { }

export default function main({ }: Props): ReactElement {
  return (
    <div className="user" id="login">
      <div className="wrapC">
        <div className="image">
          <img alt="로고" src={Logo} width="10%" height="10%" />
        </div>
        <LinkButton placeholder="달력" link="/calendar" />
        <LinkButton placeholder="지도" link="/location" />
        {/* <VolList /> */}
      </div>
    </div>
  );
}
