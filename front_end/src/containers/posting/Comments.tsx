import React from 'react';
import axios from 'axios';
// import CommentItem

interface Props {
    inP_id: string;
}


class Comments extends React.Component<Props, {}> {
    state = {
        comments: Array(),
        // c_id: "",
        // p_id: "",
        // c_content: ""
    }

    componentWillMount() {
        axios.get(`http://i02a205.p.ssafy.io:8080/A205/rest/Post/${this.props.inP_id}/Comment`,
        {headers: {
            'Content-Type': 'multipart/form-data',
            // 'Authorization': 'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxd2VydEBuYXZlci5jb20iLCJhdWQiOiIyNiIsImlzcyI6InF3ZXJ0IiwiZXhwIjoxNjEzMTc4MTQ4LCJpYXQiOjE1ODE2NDIxNDh9.qiTNnygKG972ykS6jRswyMIP6mfbnEFhCZraN-RUb3xJlSDbS46SNNQY3g9adOojGWS5XuFjdXXS7crybvkYVA',
         }})
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

    // deleteComment(c_id: number) {
    //     axios.delete(`http://i02a205.p.ssafy.io:8080/A205/rest/Post/${this.props.inP_id}/Comment/${c_id}`)
    // }

    render() {
        const prints = this.state.comments.map( (comment, i) => {
                return (
                    <p key={i}>{comment.c_content}</p>
                )
        })

        return (
            <div>
                {prints}
                {/* <span onClick={()=>this.deleteComment()}></span> */}
            </div>
    )}
};

export default Comments;