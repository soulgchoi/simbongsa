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
    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <Container>작은 화면에서의 헤더</Container>
        </Responsive>
      </div>
    );
  }
}
