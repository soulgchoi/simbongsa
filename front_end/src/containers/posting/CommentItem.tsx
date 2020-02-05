import React from 'react';

interface Props {
    comment: {
        "c_id": number;
        "c_content": string;
        "p_id": number;
    }
}


class CommentItem extends React.Component<Props, {}>{
    render() {
        return (
            <div>
                {this.props.comment.c_content}
            </div>
        )
    }
};

export default CommentItem;