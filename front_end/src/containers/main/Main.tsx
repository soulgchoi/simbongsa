import React, { ReactElement } from "react";
import "assets/mycss/components.scss";
import "assets/mycss/main.scss";

import VolList from "containers/mainpage/VolList";
import Logo from "assets/images/logo.png";
interface Props {}

export default function main({}: Props): ReactElement {
  return (
    <div className="user" id="login">
      <div className="wrapC">
        <div className="image">
          <img src={Logo} width="50%" height="50%" />
        </div>
        <VolList />
      </div>
    </div>
  );
}
