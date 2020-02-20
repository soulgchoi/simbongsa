import React, { Component } from "react";
import { Label, Icon } from 'semantic-ui-react';
import "./CertLabel.css";

interface IProps {
  v_Auth: number;
  v_pStatus: number;
}

export default class CertLabel extends Component<IProps & any, any> {
  state = {
    visibility: "",
    isCert: "",
    isCertClass: "",
    isFull: "",
    isFullClass: ""
  };

  printFunc(): void {
    if (this.props.v_Auth > 0) {
      this.setState({ isCert: "시간인증" });
      this.setState({ isCertClass: "iscert" });
      this.setState({ visibility: "true" });
    } else if (this.props.v_Auth === null) {
      this.setState({ visibility: "false" });
    }
    if (this.props.v_pStatus == 3) {
      this.setState({ isFull: "모집완료" });
      this.setState({ isFullClass: "full" });
    } else if (this.props.v_pStatus == 2) {
      this.setState({ isFull: "모집중" });
      this.setState({ isFullClass: "n-full" });
    } else if (this.props.v_pStatus == 1) {
      this.setState({ isFull: "모집대기" });
      this.setState({ isFullClass: "w-full" });
    }
  }

  componentDidMount() {
    // console.log(this.props.volunteer)
    // console.log(this.props.v_Auth)
    this.printFunc();
  }

  render() {

    return (
      <div style={{ display: "inline" }}>
          <Label className={this.state.isCertClass} size='tiny' as='a' id={this.state.visibility}><Icon name="time"/>{this.state.isCert}</Label>
          <Label className={this.state.isFullClass} size='tiny' as='a'><Icon name='user' />{this.state.isFull}</Label>
      </div>
    );
  }
}
