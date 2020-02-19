import React, { ReactElement } from "react";
import LinkButton from "components/button/LinkButton";
import { Button, Sticky, Menu, Responsive, Container } from "semantic-ui-react";

// import "assets/mycss";
// import './Footer.css'
interface Props {}

// export default function Header({ }: Props): ReactElement {
class FooterForDesktop extends React.Component<any, any> {
  state = {};

  render() {
    return (
      <div>
        {/* 큰 화면에서 보여줌 */}

        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Container>큰 화면에서의 푸터</Container>
        </Responsive>
      </div>
    );
  }
}

export default FooterForDesktop;
