import React, { Component } from "react";

interface Props {
  message : string
}
interface State {}

export default class ErrorMessage extends Component<Props, State> {
  state = {};

  render() {
    return  <div className="error-text" v-if={this.props.message}>
    {this.props.message}
  </div>;
  }
}
