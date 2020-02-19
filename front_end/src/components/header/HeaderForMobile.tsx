import React, { ReactElement } from "react";
import LinkButton from "components/button/LinkButton";
import { Link } from "react-router-dom";
import { Container, Responsive, Header, Image, Grid } from "semantic-ui-react";
import storage from "lib/storage";
import ActionButton from "components/button/ActionButton";
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
  handleLogout = () => {
    const { history } = this.props;
    storage.remove("token");
    history.push("/");
  };
  public render() {
    const { activeItem } = this.state;
    const url = window.location.href.split(
      `${process.env.REACT_APP_FRONT_URI!}/`
    )[1];
    return (
      <Container style={{ "margin-top": "10px" }}>
        <Responsive {...Responsive.onlyMobile}>
          {url === "mainpage" && (
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Header as="h2" color="orange" textAlign="center">
                    <Image centered size="big" src="/images/volunteer.gif" />
                    메인 페이지 작은 화면 헤더
                  </Header>
                </Grid.Column>
                <Grid.Column width={6}>
                  <ActionButton
                    action={this.handleLogout}
                    placeholder="로그아웃"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
          {url === "feed" && (
            <Header as="h2" color="orange" textAlign="center">
              <Image centered size="big" src="/images/volunteer.gif" />
              피드 페이지 작은 화면 헤더{" "}
              <ActionButton action={this.handleLogout} placeholder="로그아웃" />
            </Header>
          )}
          {(url === "mypage" || url === "usersetting") && (
            <Header as="h2" color="orange" textAlign="center">
              <Image centered size="big" src="/images/volunteer.gif" />
              마이 페이지 작은 화면 헤더
              <LinkButton link={"/usersetting"} placeholder="내 정보 수정" />
              <ActionButton action={this.handleLogout} placeholder="로그아웃" />
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
