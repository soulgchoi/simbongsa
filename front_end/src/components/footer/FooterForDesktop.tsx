import React, {createRef} from "react";
import { Responsive, Container, Segment, Grid, Header, List } from "semantic-ui-react";

// import "assets/mycss";
import './Footer.css'
interface Props {}

// export default function Header({ }: Props): ReactElement {
class FooterForDesktop extends React.Component<any, any> {
  state = {};
  contextRef = createRef()
  render() {
    return (
      <div>
        {/* 큰 화면에서 보여줌 */}

    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Segment vertical style={{ padding: '2em 0em', backgroundColor: "rgba(255, 147, 45, 0.61)", marginTop:"30px"}}>
      <Container>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header  as='h4' content='About' />
              <List link >
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header  as='h4' content='Services' />
              <List link >
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' >
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>



          
        </Responsive>
      </div>
    );
  }
}

export default FooterForDesktop;
