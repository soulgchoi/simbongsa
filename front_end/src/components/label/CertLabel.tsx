import React, { Component } from "react";
import 'assets/mycss/mainpage.scss';

interface Props {
  isCert: string;
  isCertClass: string;
  isFull: string;
  isFullClass: string;
}
interface State {
    visibility: string;
}

export default class CertLabel extends Component<Props, State> {
  state = {
    visibility: ""
  };

  componentWillMount() {
    if (this.props.isCert === "인증") {
      this.setState({visibility: "true"})
    } else {
      this.setState({visibility: "false"})
    }
  }

  render() {
    return (
      <div>
        <div className={this.props.isCertClass} id={this.state.visibility}>
          {this.props.isCert}
        </div>
        <div className={this.props.isFullClass}>
          {this.props.isFull}
        </div>
      </div>
    )
  }
}
