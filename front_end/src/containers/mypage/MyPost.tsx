import React, { Component } from "react";
import * as postingAction from "redux/modules/posting";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from 'components/posting/PostCard';
interface Props {
  userId: string;
  PostingAction: any;
  postList: any;
}
interface State { }

class MyPost extends Component<Props, State> {
  state = {
    pageNum: 1,
    cardList: []
  };

  componentDidMount() {
    const { PostingAction, userId } = this.props;
    const { pageNum } = this.state;
    PostingAction.resetPostByUser();
    PostingAction.getPostByUser(userId, pageNum);
    this.setState({ pageNum: pageNum + 1 });
  }

  componentWillUnmount(){
    const { PostingAction } = this.props;
    PostingAction.resetPostByUser();
  }

  loadMoreData() {
    const { userId, PostingAction } = this.props;
    const { pageNum } = this.state;
    PostingAction.getPostByUser(userId, pageNum);
    this.setState({ pageNum: pageNum + 1 });
  }

  render() {
    const { postList } = this.props;
    const PrintArray = postList.map((post: any, i: any) => {
      return <PostCard color="white" post={post} key={i} />
    });
    return (
      <InfiniteScroll
        style={{ overflow: "none"}}
        dataLength={postList.length}
        next={this.loadMoreData.bind(this)}
        hasMore={postList.length >= this.state.pageNum * 10}
        loader={<p>게시글 목록을 불러오는 중</p>}
        endMessage={<p>모든 정보를 확인했습니다.</p>}
      >
        {PrintArray}
      </InfiniteScroll>
    );
  }
}

export default connect(
  ({ user, posting, vol }: any) => ({
    postList: posting.get("postsByUser").toJS()
  }),
  dispatch => ({
    PostingAction: bindActionCreators(postingAction, dispatch)
  })
)(MyPost);
