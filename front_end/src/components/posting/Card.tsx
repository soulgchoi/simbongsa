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
    p_vote_cnt: 0;
    userId: "";
    files: [];
  };
}

class CardComponent extends React.Component<Props & any, {}> {
  state = {
    v_ids: Array(),
    ids: Array()
  };

  componentDidMount() {
    const { userId } = this.props.user.toJS();
    axios
      .get(
        process.env.REACT_APP_REST_BASE_API +
          "/rest/Member/" +
          userId +
          "/Vote",
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(res => {
        this.setState({ v_ids: res.data.data });
        console.log(this.state.v_ids);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Card>
        {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
        <Card.Content>
          <Card.Header>{this.props.post.userId}</Card.Header>
          <Card.Description>{this.props.post.p_content}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <PostDetail post={this.props.post} />
        </Card.Content>
      </Card>
    );
  }
}

export default connect((state: any) => ({
  user: state.user.get("loggedInfo")
}))(CardComponent);
