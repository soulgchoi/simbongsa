import React from 'react'

interface IProps {
    post: {
        "p_id": number;
        "p_content": string;
    }
}

class PostingItem extends React.Component<IProps, {}> {
    render() {
        return (
            <div>
                <p>{this.props.post.p_content}</p>
            </div>
        )
    }
    
}

export default PostingItem;