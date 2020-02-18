import React, { ReactElement, Component } from "react";
import { Link } from "react-router-dom";


interface IProps {
  v_id: string;
}

class PostingButton extends Component<IProps, {}> {
  state = {};

  render() {
    return (
      <div>
        <button className="my--btn">
          <Link
            to={{
              pathname: `write`,
              state: this.props.v_id
            }}
          >
            모집글 쓰러 가기
          </Link>
        </button>
      </div>
    );
  }
}

export default PostingButton;
