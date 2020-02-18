import React from "react";
import * as userActions from "redux/modules/user";
import { connect } from "react-redux";

import { Button, Header, Image, Modal, Label, Icon, Divider } from 'semantic-ui-react'
import ImageCarousel from './ImageCarousel'
import Carousel from 'nuka-carousel'

import temp from 'containers/temp/temp'

import CommentList from 'containers/posting/CommentList'
import CommentForm from 'containers/posting/CommentForm'

import './Carousel.css'
import './PostDetail.css'
import axios from 'axios';
import storage from 'lib/storage'
import { Redirect } from 'react-router-dom';
import { redirectTo } from '@reach/router';
import UserProfile from 'components/user/profile/UserProfile';
let token = storage.get('token')

import "./Carousel.css";
import "./PostDetail.css";
import axios from "axios";
import storage from "lib/storage";
import { Redirect } from "react-router-dom";
import { redirectTo } from "@reach/router";
import UserProfile from "components/user/profile/UserProfile";
let token = storage.get("token");

interface Props {
    post: {
        p_id: number,
        p_content: string,
        v_id: number,
        m_id: number,
        p_status: number,
        post_vote_members: Array<any>,
        userId: string,
        files: []
    };
}

class PostDetail extends React.Component<Props & any, {}> {
    state={
        vote_cnt: this.props.post.p_vote_cnt !== null ? this.props.post.p_vote_cnt : 0,
        p_id: 0,
        p_content: "",
        v_id: 0,
        m_id: 0,
        p_status: 0,
        post_vote_members: Array(),
        userId: 0
    }

  handleDelete(id: number, v_id: number) {
    axios
      .delete(process.env.REACT_APP_REST_BASE_API + "/rest/Post/" + id, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    window.location.reload(true);
  }

  handleVote(id: number) {
    var { m_id } = this.props.user.toJS();
    console.log(this.props);
    var post_vote = {
      p_id: id,
      m_id: m_id
    };
    console.log(post_vote);
    axios
      .post(
        process.env.REACT_APP_REST_BASE_API + "/rest/PostVote/",
        post_vote,
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    // window.location.reload(true);
    // this.forceUpdate()
    window.location.reload(true);
  }

  render() {
    var { m_id, userId } = this.props.user.toJS();
    console.log(m_id, userId);
    console.log(this.props.post);
    const images = this.props.post.files.map((file: any, i: number) => {
      console.log(file);
      return (
        <img
          key={i}
          src={"http://i02a205.p.ssafy.io:8080/A205/uploads/" + file}
        />
      );
    });
    return (
      <div>
        <Modal trigger={<span>더보기</span>}>
          <Modal.Header>
            <UserProfile profileUserId={this.props.post.userId} />
            {this.props.post.userId}
            {m_id == this.props.post.m_id && (
              <Icon
                name="x"
                onClick={(id: any, v_id: number) =>
                  this.handleDelete(this.props.post.p_id, this.props.post.v_id)
                }
              />
            )}
          </Modal.Header>

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
                        {m_id == this.props.post.m_id &&
                            <Icon name="x" onClick={(id:any, v_id:number)=>{ if (window.confirm("게시글을 삭제하시겠습니까?")) this.handleDelete(this.props.post.p_id, this.props.post.v_id)}}/>
                    }
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
                    <div className="postContent">{this.props.post.p_content}</div>
                    <Divider />
                    <div className="label">
                        <Label as='a' color='orange' size="large" onClick={(id:any)=>this.handleVote(this.props.post.p_id)}>
                            <Icon name="hand paper" />함께 해요 {this.state.vote_cnt}
                        </Label>
                    </div>
                    <Divider />
                    <div className="comment">
                    <CommentList inP_id={this.props.post.p_id}/>
                    <CommentForm inP_id={this.props.post.p_id}/>
                    </div>
                </div>
            </div>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default connect((state: any) => ({
  user: state.user.get("loggedInfo")
}))(PostDetail);