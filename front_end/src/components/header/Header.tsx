import React, { ReactElement } from "react";
import LinkButton from "components/button/LinkButton";
// import "assets/mycss";
interface Props {}

export default function Header({}: Props): ReactElement {
  return (
    <div className="vol-header">
      <div className="vol-header-item">
        <LinkButton placeholder="home" link="/mainpage" />
      </div>
      <div className="vol-header-item">
        <LinkButton placeholder="feed" link="/feed" />
      </div>
      <div className="vol-header-item">
        <LinkButton placeholder="my" link="/mypage" />
      </div>
    </div>
  );
}
