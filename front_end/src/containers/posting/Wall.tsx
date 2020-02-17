import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Post from './Post';
import PostForm from './PostForm';

class Wall extends Component{
    state = {
        posts: Array(),
        p_id: "",
        p_content: "",
        selectedFile: new File([""], "", {type: ""}),
        volunteer: {
            v_id: 0,
            v_title: "",
            v_pStatus: 0,
            v_Auth: 0
        }
    }

      componentDidMount() {
        axios.get('http://localhost:3002/post')
        .then( res => {
            console.log(res)
            const data = res.data.map( (d: any) => {
                return {p_content: d.p_content, p_id: d.id, volunteer: d.volunteer}
            })
            this.setState({
                posts: data
            })
            
        });
    }
 
render(){
    return (
        <div>     
             {/* <div>
                 <PostForm 
                     volunteer={this.state.volunteer}
                 />
             </div> */}
             <div>
                 {/* { this.state.posts.map ( post => {
                     return (
                        //  <Post
                        //      key={post.p_id}
                        //      p_id={post.p_id}
                        //     //  volunteer={post.volunteer}
                        //      p_content={post.p_content}
                        //  />
                     )
                 })} */}
             </div>

        </div>
    )
}}

export default Wall;