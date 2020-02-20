import React, { Component } from "react";
import * as postingAction from "redux/modules/posting";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
interface Props {
  userId: string;
  PostingAction: any;
}
interface State {}

class MyPost extends Component<Props, State> {
  state = {
    pageNum: 1
  };

  componentDidMount() {
    const { PostingAction, userId } = this.props;
    PostingAction.getPostByUser(userId);
  }

  appendList = () => {
    // const { postList } = this.props;
    // let idx = 0;
    // let newVolunteersForList: any[] = volunteersForList;
    // let newVolunteers: any[] = volunteers;
    // volunteers.forEach((volunteer: any) => {
    //   if (idx >= 10) {
    //     return;
    //   }
    //   newVolunteersForList.push(volunteer);
    //   idx = idx + 1;
    // });
    // for (let i = 0; i < idx; ++i) {
    //   newVolunteers.shift();
    // }
    // this.setState({
    //   volunteers: newVolunteers,
    //   volunteersForList: newVolunteersForList
    // });
  };

  render() {
    return <div></div>;
  }
}

export default connect(
  ({ user, posting, vol }: any) => ({
    userId: user.getIn(["loggedInfo", "userId"]),
    postList: posting.get("postsByUser")
  }),
  dispatch => ({
    PostingAction: bindActionCreators(postingAction, dispatch)
  })
)(MyPost);
