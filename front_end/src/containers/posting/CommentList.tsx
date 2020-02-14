import React from 'react';
import axios from 'axios';
import CommentItem from './Comment';

interface Props {
    inP_id: number;
}


class CommentList extends React.Component<Props, {}> {
    state = {
        comments: Array(),
        // c_id: "",
        // p_id: "",
        // c_content: ""
    }

    componentWillMount() {
        // axios.get(`http://i02a205.p.ssafy.io:8080/A205/rest/Post/${this.props.inP_id}/Comment`,
        // const restBaseApi = "http://70.12.247.87:8080/"; // 이신호
        console.log(this.props.inP_id)
        // axios.get(`http://70.12.247.87:8080/rest/Comment/${this.props.inP_id}`)
        // axios.get(`http://70.12.247.126:8080/rest/Comment/${this.props.inP_id}/`,
        axios.get(`http://i02a205.p.ssafy.io:8080/A205/rest/Comment/${this.props.inP_id}/`)

        .then( res => {
            console.log(res)
            if (res.data.length > 0) {
                const data = res.data.map( (d: any) => {
                    // if (data.p_id === this.props.inP_id) {
                        return {c_id: d.c_id, p_id: d.p_id, c_content: d.c_content}
                    // }
                })
                this.setState({
                    comments: data
                })
            }
        })
    }

    

    render() {
        const prints = this.state.comments.map( (comment, i) => {
                return (
                    <CommentItem 
                    comment={comment}
                    inP_id={comment.p_id}
                    key={i}
                    />
                )
        })

        return (
            <div>
                {prints}
                {/* <span onClick={()=>this.deleteComment()}></span> */}
            </div>
    )}
};

export default CommentList;