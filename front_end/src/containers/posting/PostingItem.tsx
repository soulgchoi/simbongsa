import React from "react";
import CommentList from "./CommentList";

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
        <CommentList inP_id={this.props.post.p_id} />
      </div>
    );
  }
}

export default PostingItem;
