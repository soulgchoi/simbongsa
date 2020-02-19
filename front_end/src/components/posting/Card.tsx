import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import PostDetail from "components/posting/PostDetail";
import PostUser from "./PostUser"
import "./Card.css";
import { connect } from "react-redux";
import axios from "axios";
import storage from "lib/storage";
import { List } from "immutable";
import { setHeaderVisibility } from "redux/modules/base";
let token = storage.get("token");

interface Props {
  post: {
    p_id: 0;
    p_content: "";
    v_id: 0;
    m_id: 0;
    p_status: 0;
    userId: "";
    files: [];
  };
}

class CardComponent extends React.Component<Props & any, {}> {
  state = {
    post: {
      p_content: "",
      v_id: 0,
      m_id: 0,
      p_id: this.props.post.p_id,
      post_vote_members: [],
      vote_cnt: 0,
      p_status: 0,
      userId: "",
      files: []
    }
  };

  componentDidMount() {
    const { userId } = this.props.user.toJS();
    var id = this.props.post.p_id;
    axios.get(process.env.REACT_APP_REST_BASE_API + "/rest/Post/" + id, 
    // axios.get("http://70.12.247.87:8080" + "/rest/Post/" + id, 

    {headers: { Authorization: "Bearer " + token }}
    )
    .then(res => {
      console.log(res);
      const resData = res.data.data;
      console.log(resData);
      // data.post_vote_members.map((member: any) => {
      //   this.setState({ post: {post_vote_members: this.state.post.post_vote_members.concat(member.m_id)}})
      // })
      var temp = Array()
      if (resData.post_vote_members.length > 0) {
        for (let i=0; i<resData.post_vote_members.length; i++) {
          temp.push(resData.post_vote_members[i].m_id.toString())
        }
      }
      this.setState({
        post: {
          p_content: resData.p_content,
          v_id: resData.v_id,
          m_id: resData.m_id,
          p_stats: resData.p_status,
          files: resData.files,
          p_id: resData.p_id,
          post_vote_members: temp,
          vote_cnt: temp.length
        }
      });
      console.log(this.state.post)
    })
    .catch(err => console.log(err));
  }

  handleDelete(id:number, v_id:number) {
    axios.delete("http://i02a205.p.ssafy.io:8080/A205/rest/Post/" + id, 
    { headers: { Authorization: "Bearer " + token }})
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))
    window.location.reload(true);
  }

    render() {
        const {m_id} = this.props.user.toJS()
        return (

            <Card>
                {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
                <Card.Content>
                <Card.Header>{this.props.post.userId}
                <PostUser profileUserId={this.props.post.userId} />
                <span style={{float:'right'}}>
                    {m_id == this.props.post.m_id &&
                      <Icon name="x" onClick={(id:any, v_id:number)=>{ if (window.confirm("게시글을 삭제하시겠습니까?")) this.handleDelete(this.props.post.p_id, this.props.post.v_id)}}/>
                    }
                </span>    
                </Card.Header>
                  
                </Card.Content>
                <Card.Content extra>
                    <PostDetail
                            post={this.state.post}
                    /> 
                </Card.Content>
            </Card>
        )
    }
}

export default connect((state: any) => ({
  user: state.user.get("loggedInfo")
}))(CardComponent);