import React, { ReactElement, Component } from "react";
import { Link } from "react-router-dom";

import "assets/mycss";

interface IProps {
<<<<<<< HEAD
    v_id: number;
=======
  v_id: string;
>>>>>>> ca2c51cf04e81e9795f14d38caa6eac539332395
}

class PostingButton extends Component<IProps, {}> {
  state = {};

  render() {
    return (
      <div>
        <button className="my--btn">
          <Link
            to={{
              pathname: `/write`,
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
