import React, { ReactElement } from "react";
import LinkButton from "components/button/LinkButton";
import { Link } from "react-router-dom";
import { Container, Responsive, Header, Image, Grid, Menu, Icon, Popup, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import storage from "lib/storage";
import ActionButton from "components/button/ActionButton";

import './Header.css'
interface Props {}

interface IState {
  activeItem: string;
}
export interface IAppProps {
  history: any;
}

class HeaderForMobile extends React.Component<
  IAppProps & any,
  IState
> {
  state = { activeItem: "" };
  handleLogout = () => {
    const { history } = this.props;
    storage.remove("token");
    history.push("/");
  };
  public render() {
    const { loginCheck } = this.props;
    const token = storage.get("token");
    console.log(token, "톸");
    const { activeItem } = this.state;
    const url = window.location.href.split(
      `${process.env.REACT_APP_FRONT_URI!}/`
    )[1];
    return (
      <Container style={{ marginTop: "10px" }}>
        <Responsive {...Responsive.onlyMobile}>
            <div className="header">
              <Menu
                borderless widths={3} fixed="top"
              >
              <Menu.Item name="HOME" className="goHome">
                <Image as="a" href="/" src="/images/logo2.png" style={{width:"6em", padding:"0.3em", marginLeft:"0.2em"}} />
              </Menu.Item>
              <Menu.Item className="located"> 
                  {url === "mainpage" && ("봉사활동 맞춤검색")}     
                  {url === "feed" && ("피드")}
                  {(url === "mypage" || url === "usersetting") && ("마이페이지")}
                  {url === "" && ("")}
                  {url === "login" && ("로그인")}
                  {window.location.href.includes("detail") && ("봉사활동 상세정보")}
                  {window.location.href.includes("write") && ("글 작성하기")}
                  {window.location.href.includes("postinglist") && ("모집 & 후기")}
              </Menu.Item>
              <Menu.Item className="icons">
                <Icon name="arrow left" size="large" onClick={this.props.history.goBack} style={{marginRight: "1em"}}/>
                <Popup trigger={<Icon name="user" size="large" style={{marginRight: "0.5em"}}/>}>
                  <Grid>
                    <Grid.Column>
                      {!loginCheck ?
                      (<a href="/login" style={{textDecoration: "none"}}>로그인</a>)
                      :
                      (<p onClick={this.handleLogout}>로그아웃</p>)
                    }
                    </Grid.Column>
                  </Grid>
                </Popup>
              </Menu.Item>
            </Menu>
            </div>
        </Responsive>
      </Container>
    );
  }
}

export default connect(
  ({ auth }: any) => ({
    loginCheck: auth.get("loginCheck")
  }),
)(HeaderForMobile);