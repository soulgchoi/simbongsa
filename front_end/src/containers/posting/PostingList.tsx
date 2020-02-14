import React, {Component} from 'react'
import axios from 'axios'
import Post from './Post';

interface IProps {
    v_id?: number;
}

class PostingList extends Component<IProps, {}> {
    state = {
        posts: Array(),
    }
    // v_id & 팔로우 여부로
    api1 = `http://70.12.247.126:8080/rest/VolFeed/1/3/1`
    // axios.get("http://i02a205.p.ssafy.io:8080/A205/rest/Post/" + "1", 
    api2 = 'http://70.12.247.87:8080/rest/Post/1'
    componentDidMount() {
        var restAPI = "";
        console.log(this.props.v_id)
        if (this.props.v_id == null) {
            restAPI = this.api2
        } else {
            restAPI = this.api1
        }
        axios.get("http://i02a205.p.ssafy.io:8080/A205/rest/VolFeed/1/3/1")
        .then( res => {
            console.log("res.data", res)
            const data = res.data.data
            // console.log(data)
            // console.log(data.uris)
            this.setState(
                {
                    posts: res.data.data,
                })
                console.log(this.state.posts)
            }
            
        )
        .catch(err => console.log(err))
    };
    
 
render(){
    const { posts } = this.state;
    const postingList = posts.map( (post: any) => {
        return (
            <Post
                post={post}
            />
        )
    })
    return (
        <div>
            {postingList}
        </div>
    )
}}

export default PostingList;