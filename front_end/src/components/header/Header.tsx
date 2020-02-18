import React, { ReactElement } from "react";
import LinkButton from "components/button/LinkButton";
import { Link } from "react-router-dom";
import { Button, Grid, Divider } from "semantic-ui-react";
// import "assets/mycss";
interface Props { }

export default function Header({ }: Props): ReactElement {
  return (
    <div>
      <Button.Group fluid widths="3">
        <Link to={"/mainpage"}>
          <Button color="orange">main</Button>
        </Link>
        <Link to={"/feed"}>
          <Button color="orange">feed</Button>
        </Link>
        <Link to={"/mypage"}>
          <Button color="orange">my page</Button>
        </Link>
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
