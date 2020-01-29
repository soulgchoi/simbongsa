import React, { Component } from "react";
import { Link } from "react-router-dom";
import "assets/mycss/components.scss";
interface Props {
  placeholder: string;
  link: string;
  disabled?: boolean;
}
interface State {}

export default class LinkButton extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <Link to={this.props.link} className="my--btn">
          {this.props.placeholder}
        </Link>
      </div>
    );
  }
}
