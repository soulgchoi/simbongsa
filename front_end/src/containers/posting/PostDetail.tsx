import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import PostForm from './PostForm';
import Comments from "./CommentList";
import CommentForm from "./CommentForm"

interface Props {
    post: {
        p_id: 0,
        p_content: "",
        v_id: 0,
        m_id: 0,
        p_status: 0,
        files?: []
    };
}

class PostDetail extends Component<Props, {}>{
    state = {
        post: {
            p_id: this.props.post.p_id,
            p_content: "",
            v_id: 0,
            m_id: 0,
            p_status: 0,
            files: []
        }
    }

    componentDidMount() {
        var id = this.props.post.p_id
        axios.get("http://i02a205.p.ssafy.io:8080/A205/rest/Post/" + id
            )
        .then( res => {
            console.log(res)
            const data = res.data.data
            console.log(data)
            this.setState(
                {
                    post:
                        {
                            p_content: data.p_content,
                            v_id: data.v_id,
                            m_id: data.m_id,
                            p_stats: data.p_status,
                            files: data.files,
                        }
                }   
            )

            })
        .catch(err => console.log(err))
    };
    
 
render(){
    return (
        <div>
            {this.state.post.p_content}
            {this.state.post.v_id}
            <Comments inP_id={this.state.post.p_id} />
            <br/><br/>
            <CommentForm inP_id={this.state.post.p_id} />
        </div>
    )
}}

export default PostDetail;