import React from 'react';
import axios from 'axios';
import PostingItem from './PostingItem';
import CommentForm from './CommentForm';
import CommentList from './CommentList';


class PostingList extends React.Component {
    state = {
        getPosts: Array(),
        p_id: 0,
        p_content: ""
    }

    componentDidMount() {
        axios.get('http://localhost:3002/post')
        .then( res => {
            console.log(res)
            const data = res.data.map( (d: any) => {
                return {p_content: d.p_content, p_id: d.id}
            })
            this.setState({
                getPosts: this.state.getPosts.concat(data)
            })
            
        });
    }

    render() {
        const posts = this.state.getPosts.map( (post, i) => {
            return <PostingItem post={post} key={i} />
        })
        return (
            <div>
                {posts}
            </div>
        )
    }
};

export default PostingList;