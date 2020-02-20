import React from "react";
import { Card, Icon, Confirm } from "semantic-ui-react";
import PostDetail from "components/posting/PostDetail";
import PostUser from "./PostUser"
import "./Card.css";
import { connect } from "react-redux";
import axios from "axios";
import storage from "lib/storage";

const restBaseApi = process.env.REACT_APP_REST_BASE_API!;
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
    },
    open: false,
    result: false
  };

  show = () => this.setState({ open: true })
    
  handleConfirm = () => this.setState({ result: true, open: false })
  
  handleCancle=() => this.setState({ result: false, open: false })


  componentDidMount() {
    var id = this.props.post.p_id;
    axios.get( restBaseApi + "/rest/Post/" + id, 

    {headers: { Authorization: "Bearer " + token }}
    )
    .then(res => {
      const resData = res.data.data;
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
    })
    .catch(err => console.log(err));
  }

  handleDelete(id:number) {
    axios.delete( restBaseApi + "/rest/Post/" + id, 
    { headers: { Authorization: "Bearer " + token }})
    .then(res => {
        // console.log(res)
    })
    .catch(err => console.log(err))
    window.location.reload(true);
  }

    render() {
        const {m_id} = this.props.user.toJS()
        if (this.state.result === true) {
          this.handleDelete(this.props.post.p_id)
          this.setState({ result: false})
      }
        return (

            <Card>
                <Card.Content>
                <Card.Header>{this.props.post.userId}
                <PostUser profileUserId={this.props.post.userId} />
                <span style={{float:'right'}}>
                    {m_id == this.props.post.m_id &&
                      <Icon name="x" onClick={this.show}/>
                    }
                    <Confirm
                      content='작성한 글을 삭제하시겠습니까?'
                      cancelButton='아니오'
                      confirmButton='네'
                      open={this.state.open}
                      onCancel={this.handleCancle}
                      onConfirm={this.handleConfirm}
                      size='tiny'
                    />
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