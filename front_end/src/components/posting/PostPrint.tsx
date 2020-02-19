import React from 'react'
import * as userActions from "redux/modules/user"
import { connect } from "react-redux";

import { Button, Header, Image, Modal, Label, Icon, Divider } from 'semantic-ui-react'
import ImageCarousel from './ImageCarousel'
import Carousel from 'nuka-carousel'

import temp from 'containers/temp/temp'

import CommentList from 'containers/posting/CommentList'
import CommentForm from 'containers/posting/CommentForm'
import PostVote from 'components/posting/PostVote'
import CommentPrint from 'components/posting/CommentPrint'


import './Carousel.css'
import './PostDetail.css'
import axios from 'axios';
import storage from 'lib/storage'
import { Redirect } from 'react-router-dom';
import { redirectTo } from '@reach/router';
import UserProfile from 'components/user/profile/UserProfile';
let token = storage.get('token')


interface Props {
    post: {
        p_id: number,
        p_content: string,
        v_id: number,
        m_id: number,
        p_status: number,
        post_vote_members: Array<any>,
        vote_cnt: number,
        userId: string,
        files: []
    };
}


class PostDetail extends React.Component<Props & any, {}> {

    handleVote(id:number) {
        var { m_id } = this.props.user.toJS()
        console.log(this.props)
        var post_vote = {
            p_id: id,
            m_id: m_id
        }
        console.log(post_vote)
        axios.post("http://i02a205.p.ssafy.io:8080/A205/rest/PostVote/",
        post_vote, 
        { headers: { Authorization: "Bearer " + token }})
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
        // this.setState({vote_cnt: this.state.vote_cnt+1})
    }


    render() {
        var { m_id, userId } = this.props.user.toJS()
        console.log(m_id, userId)
        console.log(this.props.post)
        const images = this.props.post.files.map( (file:any, i:number) => {
            console.log(file)
            return (
                <img key={i} src={"http://i02a205.p.ssafy.io:8080/A205/uploads/" + file} />
            )
        })
        console.log(this.props.post.p_id)
        return (
            <div>
                <div>
                    <div>
                    
                        <UserProfile profileUserId={this.props.post.userId} />
                        
                    </div>
                    <Divider />
                    <div className="postedImage">
                    {this.props.post.files.length > 0 ?
                        (<Carousel>
                            {images}
                        </Carousel>)
                        : (<Image>
                        <Label content='No Image' icon='warning' />
                        </Image>)
                    }
                    </div>
                    <Divider />
                    <div className="postContent">
                        {this.props.post.p_content.length > 0 ? 
                        (<div>{this.props.post.p_content}</div>)
                        : (<div style={{color: 'rgb(185, 185, 185)'}}>내용이 없는 글입니다.</div>)}
                    </div>
                    <Divider />
                    <Divider />
                    <CommentPrint 
                        post={this.props.post}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    (state: any) => ({
        user: state.user.get("loggedInfo")
    }),

)(PostDetail);