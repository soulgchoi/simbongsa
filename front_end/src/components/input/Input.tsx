import React, { Component } from "react";
import "assets/mycss/components.scss";

interface Props {
  value: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.FormEvent<HTMLInputElement>) => void;
  id: string;
  placeholder: string;
  name: string;
  type: string;
}
interface State {}
export default class Input extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div>
        <div className="input-with-label">
          <input
            value={this.props.value}
            onChange={this.props.onChange}
            id={this.props.id}
            placeholder={this.props.placeholder}
            type={this.props.type}
            onKeyDown={event => {
              if (event.key === "Enter" && this.props.onEnter !== undefined) {
                this.props.onEnter(event);
              }
            }}
          />
          <label htmlFor={this.props.id}>{this.props.name}</label>
        </div>
      </div>
    );
  }
}
