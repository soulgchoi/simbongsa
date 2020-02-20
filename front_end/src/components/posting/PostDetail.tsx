import React from 'react'
import { connect } from "react-redux";

import { Image, Label, Icon, Divider } from 'semantic-ui-react'
import Carousel from 'nuka-carousel'


import CommentList from 'containers/posting/CommentList'
import CommentForm from 'containers/posting/CommentForm'

import './Carousel.css'
import './PostDetail.css'
import axios from 'axios';
import storage from 'lib/storage'

const restBaseApi = process.env.REACT_APP_REST_BASE_API!;
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
    state={
        // vote_cnt: this.props.post.vote_cnt,
        vote_cnt: this.props.post.post_vote_members.length,
        post_vote_members: Array(),
    }

    handleVote(id:number) {
        var { m_id } = this.props.user.toJS()
        var post_vote = {
            p_id: id,
            m_id: m_id
        }
        console.log(post_vote)
        axios.post(restBaseApi + "/rest/PostVote/",
        post_vote, 
        { headers: { Authorization: "Bearer " + token }})
        .then(res => {
            // console.log(res)
        })
        .catch(err => console.log(err))
        this.setState({vote_cnt: this.state.vote_cnt+1})
    }


    render() {
        var { m_id, userId } = this.props.user.toJS()
        const images = this.props.post.files.map( (file:any, i:number) => {
            return (
                <img key={i} src={ restBaseApi + "/uploads/" + file} />
            )
        })
        console.log(this.props.post.p_id)
        return (
            <div>
                <div>
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
                    <div className="label">
                        <Label
                            as='a' 
                            color={this.props.post.post_vote_members.includes(m_id) ? 'grey' : 'orange'} 
                            size="large" 
                            onClick={(id:any)=>this.handleVote(this.props.post.p_id)}
                        >
                            <Icon name="hand paper" />함께 해요 {this.props.post.vote_cnt}
                        </Label>
                    </div>
                    <Divider />
                    <div className="comment">
                    <CommentList inP_id={this.props.post.p_id}/>
                    <CommentForm inP_id={this.props.post.p_id}/>
                    </div>
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