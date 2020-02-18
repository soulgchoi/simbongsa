import React, { ReactElement } from "react";
import LinkButton from "components/button/LinkButton";
import { Link } from "react-router-dom";
import { Button, Grid, Divider } from "semantic-ui-react";
// import "assets/mycss";
interface Props { }

export default function Header({ }: Props): ReactElement {
  return (
    <div>
      <Button.Group widths="3">
        <Button color="orange" href="/mainpage">
          home
        </Button>
        <Button color="orange" href="/feed">
          feed
        </Button>
        <Button color="orange" href="/mypage">
          my
        </Button>
      </Button.Group>
      {/* <Grid>
      <Grid.Row>
        <Grid.Column width={5}>
          
        </Grid.Column>
        <Grid.Column width={5}>
          
        </Grid.Column>
        <Grid.Column width={5}>
          
        </Grid.Column>
      </Grid.Row>
    </Grid> */}
    </div>
  );
}
