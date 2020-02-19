import React from 'react';
import CommentList from 'containers/posting/CommentList';
import CommentForm from 'containers/posting/CommentForm';

interface Props {
    post: {
        p_id: number,
        p_content: string,
        v_id: number,
        m_id: number,
        p_status: number,
        post_vote_members: Array<any>,
        vote_cnt: number,
        userId: string,
        files: []
    };
}

class CommentPrint extends React.Component<any, any>{
    constructor(props: Props) {
        super(props)
    }
    render() {
        return (
            <div className="comment">
                <CommentList inP_id={this.props.post.p_id}/>
                <CommentForm inP_id={this.props.post.p_id}/>
            </div>
        )
    }
}

export default CommentPrint;