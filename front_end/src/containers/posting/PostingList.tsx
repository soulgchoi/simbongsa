import React, { Component } from 'react'
import axios from 'axios'
import Post from './Post';
import storage from 'lib/storage'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'


let token = storage.get('token')



class PostingList extends Component<any, any> {
    constructor(props: any){
        super(props)
        this.state = {
            posts: Array(),
            pgNum: 1,
        }
    }

    // v_id & 팔로우 여부로
    v_id = this.props.match.params.id
    api1 = "http://i02a205.p.ssafy.io:8080/A205/rest/VolFeed/"
    // axios.get("http://i02a205.p.ssafy.io:8080/A205/rest/Post/" + "1", 
    api2 = 'http://70.12.247.87:8080/rest/Post/1'
    componentDidMount() {
        var restAPI = "";
        console.log(this.v_id)
        if (this.v_id) {
            restAPI = this.api1
        // } else if (this.props.follow) {
            // restAPI = this.api1
        }
        axios.get(restAPI + this.v_id + "/10/" + this.state.pgNum,
        { headers: { Authorization: "Bearer " + token }})
        .then( res => {
            console.log("res.data", res)
            const data = res.data.data
            this.setState(
                {
                    posts: res.data.data,
                    pgNum: this.state.pgNum + 1
                })
                console.log(this.state.posts)
            }

            )
            .catch(err => console.log(err))
    };

    loadMoreData() {
        var restAPI = "";
        console.log(this.v_id)
        if (this.v_id) {
            restAPI = this.api1
        // } else if (this.props.follow) {
            // restAPI = this.api1
        }
        axios.get(restAPI + this.v_id + "/10/" + this.state.pgNum,
        { headers: { Authorization: "Bearer " + token }})
        .then( res => {
            console.log("res.data", res)
            const data = res.data.data
            this.setState(
                {
                    posts: this.state.posts.concat(res.data.data),
                    pgNum: this.state.pgNum + 1
                })
                console.log(this.state.posts)
            }
            
        )
        .catch(err => console.log(err))

    }
    
 
render(){
    console.log(this.props)
    const { posts } = this.state;
    const postingList = posts.map( (post: any, i: any) => {
        return (
            <Post
                post={post}
                key={i}
            />
        )
    })
    return (
        <InfiniteScroll
            dataLength={this.state.pgNum *10}
            next={this.loadMoreData.bind(this)}
            hasMore={true}
            loader={<h4>게시글 목록을 불러오는 중</h4>}
            endMessage={<h4>모든 정보를 확인했습니다.</h4>}
        >
            {postingList}
        </InfiniteScroll>
    )
}}

export default PostingList;