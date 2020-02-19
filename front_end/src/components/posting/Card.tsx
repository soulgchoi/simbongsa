import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import PostDetail from "components/posting/PostDetail";
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
      p_status: 0,
      userId: "",
      files: []
    }
  };

  componentDidMount() {
    const { userId } = this.props.user.toJS();
    var id = this.props.post.p_id;
    axios.get(process.env.REACT_APP_REST_BASE_API + "/rest/Post/" + id, 
    {headers: { Authorization: "Bearer " + token }}
    )
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
          p_id: data.p_id,
          post_vote_members: data.post_vote_members
        }
      });
    })
    .catch(err => console.log(err));
  }

    render() {
        return (

            <Card>
                {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
                <Card.Content>
                <Card.Header>{this.props.post.userId}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <PostDetail
                            post={this.props.post}
                    /> 
                </Card.Content>
            </Card>
        )
    }
}

export default connect((state: any) => ({
  user: state.user.get("loggedInfo")
}))(CardComponent);