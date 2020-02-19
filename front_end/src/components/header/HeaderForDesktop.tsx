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

export default class HeaderForDesktop extends React.Component<
  IAppProps,
  IState
> {
  state = { activeItem: "" };

  handleItemClick = (e: any, { name }: any) => {
    this.setState({ activeItem: name });
    const { history } = this.props;
    if (name === "HOME") {
      history.push("/mainpage");
    } else if (name === "FEED") {
      history.push("/feed");
    } else if (name === "MY") {
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
