import React from "react";
import Comments from "./Comments";

interface IProps {
  post: {
    p_id: number;
    p_content: string;
  };
}

class PostingItem extends React.Component<IProps, {}> {
  render() {
    return (
      <div>
        <p>{this.props.post.p_content}</p>
        <Comments inP_id={this.props.post.p_id.toString()} />
      </div>
    );
  }
}

export default PostingItem;
