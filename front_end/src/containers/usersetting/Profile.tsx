import React, { Component } from "react";
import GoBackButton from "components/button/GoBackButton";
import { Container, Button } from "semantic-ui-react";
interface Props {}
interface State {}

export default class Profile extends Component<Props, State> {
  state = {};
  handleWithdraw = () => {};
  render() {
    const { handleWithdraw } = this;
    return (
      <div>
        정말로 탈퇴하시겠어요?
        <Container>
          <GoBackButton text="아니오" />
          <Button
            inverted
            color="orange"
            //   fluid
            //   size="large"
            width="84px"
            onClick={handleWithdraw}
            style={{
              marginLeft: 50,
              paddingLeft: 35,
              paddingRight: 35
            }}
          >
            예
          </Button>
        </Container>
      </div>
    );
  }
}
