import React, { Component } from "react";
import "assets/mycss/components.scss";
interface Props {
  placeholder: string;
  action: () => void;
}
interface State {}

export default class ActionButton extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <button className="my--btn" onClick={this.props.action}>
          {this.props.placeholder}
        </button>
      </div>
    );
  }
}
