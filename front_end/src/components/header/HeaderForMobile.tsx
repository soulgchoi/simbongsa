import React, { ReactElement } from "react";
import LinkButton from "components/button/LinkButton";
import { Link } from "react-router-dom";
import { Container, Responsive, Menu } from "semantic-ui-react";
// import "assets/mycss";
interface Props {}

interface IState {
  activeItem: string;
}
export interface IAppProps {
  history: any;
}

export default class Header extends React.Component<IAppProps, IState> {
  state = { activeItem: "" };

  public render() {
    const { activeItem } = this.state;
    const url = window.location.href.split(
      `${process.env.REACT_APP_FRONT_URI!}/`
    )[1];
    console.log("유알엘", url);
    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          {url === "mainpage" && (
            <Container>메인페이지 작은 화면 헤더</Container>
          )}
          {url === "feed" && <Container>피드페이지 작은 화면 헤더</Container>}
          {url === "mypage" && <Container>마이페이지 작은 화면 헤더</Container>}
        </Responsive>
      </div>
    );
  }
}
