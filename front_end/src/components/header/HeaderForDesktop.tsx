import React from "react";
import { Container, Responsive, Menu } from "semantic-ui-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as pageActions from 'redux/modules/page';
import * as volActions from "redux/modules/vol";
import * as userActions from "redux/modules/user";
interface Props {}

interface IState {
  activeItem: string;
}
export interface IAppProps {
  history: any;
  PageActions : any;
  VolActions : any;
  UserActions : any;
}

class HeaderForDesktop extends React.Component<
  IAppProps,
  IState
> {
  state = { activeItem: "" };

  handleItemClick = (e: any, { name }: any) => {
    this.setState({ activeItem: name });
    const { history, PageActions, VolActions, UserActions } = this.props;
    PageActions.setCurrentTab(0);
    if (name === "HOME") {
      UserActions.resetFeedList();
      window.scrollTo(0, 0);
      history.push("/mainpage");
    } else if (name === "FEED") {
      VolActions.resetVolunteerForList();
      window.scrollTo(0, 0);
      history.push("/feed");
    } else if (name === "MY") {
      UserActions.resetFeedList();
      VolActions.resetVolunteerForList();
      window.scrollTo(0, 0);
      history.push("/mypage");
    }
  };
  public render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Menu borderless widths={3} fixed="top">
            <Container>
              <Menu.Item
                name="HOME"
                active={activeItem === "HOME"}
                onClick={this.handleItemClick}
              >
                HOME
              </Menu.Item>
              <Menu.Item
                name="FEED"
                active={activeItem === "FEED"}
                onClick={this.handleItemClick}
              >
                FEED
              </Menu.Item>
              <Menu.Item
                name="MY"
                active={activeItem === "MY"}
                onClick={this.handleItemClick}
              >
                MY
              </Menu.Item>
            </Container>
          </Menu>
        </Responsive>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    loginCheck: state.auth.get("loginCheck")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    PageActions: bindActionCreators(pageActions, dispatch),
    VolActions: bindActionCreators(volActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(HeaderForDesktop);