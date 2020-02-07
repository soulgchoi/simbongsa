import React from 'react';
import axios from 'axios';


interface Props {
    p_id: string;
}


class Comments extends React.Component<Props, {}> {
    state = {
        comments: Array(),
        c_id: "",
        p_id: "",
        c_content: ""
    }

    componentWillMount() {
        axios.get('http://localhost:3002/comment')
        .then( res => {
            console.log(res)
            if (res.data.length > 0) {
                const data = res.data.map( (d: any) => {
                    // if (data.p_id === this.props.p_id) {
                        return {c_id: d.id, p_id: d.p_id, c_content: d.c_content}
                    // }
                })
                this.setState({
                    comments: data
                })
            }
        })
    }

    deleteComment() {
        // axios.delete('url')
    }

    render() {
        const prints = this.state.comments.map( (comment) => {
            if (comment.p_id == this.props.p_id) {
                return (
                    <p>{comment.c_content}</p>
                )
            }
        })

        return (
            <div>
                {prints}
            </div>
    )}
};

export default Comments;