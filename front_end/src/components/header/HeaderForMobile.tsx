import React from "react";

import { Container, Responsive, Image, Grid, Menu, Icon, Button, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom'
import storage from "lib/storage";
import * as authActions from 'redux/modules/auth';
import './Header.css'
interface Props { }

interface IState {
  activeItem: string;
}
export interface IAppProps {
  history: any;
  loginCheck: boolean;
}

class HeaderForMobile extends React.Component<
  IAppProps & any,
  IState
  >
{

  state = { activeItem: "" };
  handleLogout = async () => {
    const { AuthActions, history } = this.props;
    console.log("핸들 로그아웃")
    storage.remove("token");
    AuthActions.loginCheck(false);
    console.log("로그아웃완료");
    history.push("/");
  };
  render() {
    const { loginCheck } = this.props;
    const url = window.location.href.split(
      `${process.env.REACT_APP_FRONT_URI!}/`
    )[1];
    return (
      <Container style={{ marginTop: "10px" }}>
        <Responsive {...Responsive.onlyMobile}>
          <div className="header">
            <Menu
              borderless widths={3} fixed="top" icon
            >
              <Menu.Item name="HOME" className="goHome">
                <Link to="/"><Image src="/images/logo2.png" style={{ width: "6rem", padding: "0.3rem", marginLeft: "0.2rem" }} /></Link>
              </Menu.Item>
              <Menu.Item className="located">
                {url === "mainpage" && ("봉사활동 맞춤검색")}
                {url === "feed" && ("피드")}
                {(url === "mypage" || url === "usersetting") && ("마이페이지")}
                {url === "" && ("")}
                {url === "login" && ("로그인")}
                {url === "join" && ("회원가입")}
                {window.location.href.includes("detail") && ("봉사활동 상세정보")}
                {window.location.href.includes("write") && ("글 작성하기")}
                {window.location.href.includes("postinglist") && ("모집 & 후기")}
              </Menu.Item>
              <Menu.Item className="icons">
                <Icon name="arrow left" size="large" onClick={this.props.history.goBack} style={{ marginRight: "1em" }} />
                <Dropdown compact icon="user" style={{ marginRight: "4rem" }}>
                  <Dropdown.Menu>
                    {!loginCheck ? (
                      <Dropdown.Item >
                        <Link to="/login">
                          로그인
                          </Link>
                      </Dropdown.Item>
                    ) : (
                        <div>                 <Dropdown.Item onClick={this.handleLogout}>
                          로그아웃
                      </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item>
                            <Link to="/usersetting">
                              회원정보수정
                      </Link>
                          </Dropdown.Item>
                        </div>)}

                  </Dropdown.Menu>
                </Dropdown>
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
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(HeaderForMobile);