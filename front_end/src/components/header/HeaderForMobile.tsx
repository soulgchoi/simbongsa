import React, { ReactElement } from "react";
import LinkButton from "components/button/LinkButton";
import { Link } from "react-router-dom";
import { Container, Responsive, Header, Image } from "semantic-ui-react";
// import "assets/mycss";
interface Props {}

interface IState {
  activeItem: string;
}
export interface IAppProps {
  history: any;
}

export default class HeaderForMobile extends React.Component<
  IAppProps,
  IState
> {
  state = { activeItem: "" };

  public render() {
    const { activeItem } = this.state;
    const url = window.location.href.split(
      `${process.env.REACT_APP_FRONT_URI!}/`
    )[1];
    console.log("유알엘", url);
    return (
      <Container style={{ "margin-top": "10px" }}>
        <Responsive {...Responsive.onlyMobile}>
          {url === "mainpage" && (
            <Header as="h2" color="orange" textAlign="center">
              <Image centered size="big" src="/images/volunteer.gif" />
              메인 페이지 작은 화면 헤더
            </Header>
          )}
          {url === "feed" && (
            <Header as="h2" color="orange" textAlign="center">
              <Image centered size="big" src="/images/volunteer.gif" />
              피드 페이지 작은 화면 헤더
            </Header>
          )}
          {(url === "mypage" || url === "usersetting") && (
            <Header as="h2" color="orange" textAlign="center">
              <Image centered size="big" src="/images/volunteer.gif" />
              마이 페이지 작은 화면 헤더
              <LinkButton link={"/usersetting"} placeholder="내 정보 수정" />
            </Header>
          )}
          {url === "" && (
            <Header as="h2" color="orange" textAlign="center">
              <Image centered size="big" src="/images/volunteer.gif" />
              인트로 페이지 작은 화면 헤더
              <LinkButton link={"/login"} placeholder={"로그인"} />
            </Header>
          )}
          {url === "login" && (
            <Header as="h2" color="orange" textAlign="center">
              <Image centered size="big" src="/images/volunteer.gif" />
              로그인 페이지 작은 화면 헤더
            </Header>
          )}
        </Responsive>
      </Container>
    );
  }
}
