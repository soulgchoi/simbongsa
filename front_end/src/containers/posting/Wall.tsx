import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Post from './Post';
import PostForm from './PostForm';

class Wall extends Component{
    state = {
        posts: {
            uris: [],
            post: {
                p_content: "",
                v_id: 0,
                m_id: 0,
                p_status: 0,
            }
        }
    }

    componentDidMount() {
        axios.get("http://13.124.127.232:8080/A205/rest/Post/" + "1")
        .then( res => {
            console.log(res)
            const data = res.data.data
            console.log(data)
            console.log(data.uris)
            this.setState(
                {
                    posts: { 
                        uris: data.uris,
                        post:
                            {
                                p_content: data.post.p_content,
                                v_id: data.post.v_id,
                                m_id: data.post.m_id,
                                p_stats: data.post.p_status}
                    }
                }   
            )

            })
        .catch(err => console.log(err))
    };
    
 
render(){
    return (
        <div>
            {this.state.posts.post.p_content}  
        </div>
    )
}}

export default Wall;