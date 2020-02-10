import React from "react";

interface IProps {
  title: any;
  content: any;
}

class PostingItem extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default PostingItem;
