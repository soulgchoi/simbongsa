import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import PostForm from "./PostForm";
import Comments from "./CommentList";
import CommentForm from "./CommentForm";
import storage from "lib/storage";

let token = storage.get("token");

interface Props {
  post: {
    p_id: 0;
    p_content: "";
    v_id: 0;
    m_id: 0;
    p_status: 0;
    files?: [];
  };
}

class Post extends Component<Props, {}> {
  state = {
    post: {
      p_id: this.props.post.p_id,
      p_content: "",
      v_id: 0,
      m_id: 0,
      p_status: 0,
      files: []
    }
  };

  componentDidMount() {
    var id = this.props.post.p_id;
    axios
      .get(process.env.REACT_APP_REST_BASE_API + "/rest/Post/" + id, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(res => {
        console.log(res);
        const data = res.data.data;
        console.log(data);
        this.setState({
          post: {
            p_content: data.p_content,
            v_id: data.v_id,
            m_id: data.m_id,
            p_stats: data.p_status,
            files: data.files,
            p_id: data.p_id
          }
        });
      })
      .catch(err => console.log(err));
  }

  postDelete(id: number) {
    axios.delete(process.env.REACT_APP_REST_BASE_API + "/rest/Post/" + id, {
      headers: { Authorization: "Bearer " + token }
    });
  }

  render() {
    return (
      <div>
        {this.state.post.p_content}
        {this.state.post.v_id}
        <p onClick={() => this.postDelete(this.state.post.p_id)}>[X]</p>
        <Comments inP_id={this.state.post.p_id} />
        <br />
        <br />
        <CommentForm inP_id={this.state.post.p_id} />
      </div>
    );
  }
}

export default Post;
