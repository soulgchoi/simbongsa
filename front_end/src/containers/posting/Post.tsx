import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Post from './Post';
import PostForm from './PostForm';
import Comments from "./Comments";
import AddComments from "./AddComment"

class Wall extends Component{
    state = {
        post: {
            p_content: "",
            v_id: 0,
            m_id: 0,
            p_status: 0,
            uris: []
        }
    }

    componentDidMount() {
        axios.get("http://i02a205.p.ssafy.io:8080/A205/rest/Post/" + "1")
        .then( res => {
            console.log(res)
            const data = res.data.data
            console.log(data)
            console.log(data.uris)
            this.setState(
                {
                    post:
                        {
                            p_content: data.post.p_content,
                            v_id: data.post.v_id,
                            m_id: data.post.m_id,
                            p_stats: data.post.p_status,
                            uris: data.uris,
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
            <Comments inP_id={"1"} />
            <AddComments inP_id={"1"} />
        </div>
    )
}}

export default Wall;