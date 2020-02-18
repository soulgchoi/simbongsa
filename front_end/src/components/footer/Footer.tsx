import React, { ReactElement } from "react";
import LinkButton from "components/button/LinkButton";
import { Link } from "react-router-dom";
import { Button, Sticky, Menu } from "semantic-ui-react";
// import "assets/mycss";
import './Footer.css'
interface Props { }

// export default function Header({ }: Props): ReactElement {
class Footer extends React.Component<any, any>{
  render() {
    // const { activeItem } = this.state
    return (
        <Menu
          borderless
      >
          <Menu.Item
            name="HOME"
            href="/mainpage"
          />
          <Menu.Item 
            name="FEED"
            href="/feed"
          />
          <Menu.Item 
            name="MY"
            href="/mypage"
          />
          {/* <Button.Group widths="3">
          <Button color="orange" href="/mainpage">
            home
          </Button>
          <Button color="orange" href="/feed">
            feed
          </Button>
          <Button color="orange" href="/mypage">
            my
          </Button>
        </Button.Group> */}
        </Menu>
        
    );
  }
}

export default Footer;