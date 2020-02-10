import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Post from './Post';
import PostForm from './PostForm';

class Wall extends Component{
    state = {
        posts:[],
    }

      componentDidMount() {
        axios.get('http://localhost:3002/post').then(response => {
          if (response.data) {
            this.setState({
                posts: response.data
            })
          }
        })
    }
 
render(){
    return (
        <div>     
                {/* <div>
                    <PostForm />
                </div>
                <div>
                { this.state.posts.map( post => {
                    // return (
                    //     <div></div>
                    // <Post
                    //     p_content={post.p_content}
                    //     p_id={post.p_id}
                    // />
                    )})}

                </div> */}

        </div>
    )
}}

