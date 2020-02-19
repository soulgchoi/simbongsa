import React, { Component } from "react";
import { List } from "immutable";
import { connect } from "react-redux";
// import * as volActions from "redux/modules/volunteer";
import * as volActions from "redux/modules/vol";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "components/posting/Card";
// import "containers/posting/PostingList.css";
interface Props {
  UserActions: any;
  feedList: List<any>;
  mId: number;
  match: any;
}
interface State {}

class Feed extends Component<Props, State> {
  state = {
    pageNum: 1
    // width: window.innerWidth,
    // height: window.innerHeight - 345
  };
  // v_id & 팔로우 여부로
  v_id = this.props.match.params.id;
  restAPI = process.env.REACT_APP_REST_BASE_API + "/rest/VolFeed/";
  componentDidMount() {
    const { UserActions, mId } = this.props;
    const { pageNum } = this.state;
    UserActions.getFeedList(mId, pageNum);
    this.setState({ pageNum: pageNum + 1 });
  }

  loadMoreData() {
    const { UserActions, mId } = this.props;
    const { pageNum } = this.state;
    UserActions.getFeedList(mId, pageNum);
    this.setState({ pageNum: pageNum + 1 });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const feedList = this.props.feedList.toJS();
    const postingList = feedList.map((feed: any, i: any) => {
      return <Card post={feed} key={i} />;
    });
    return (
      <InfiniteScroll
        dataLength={feedList.length}
        next={this.loadMoreData.bind(this)}
        hasMore={feedList.length <= this.state.pageNum * 10}
        loader={<h4>게시글 목록을 불러오는 중</h4>}
        endMessage={<h4>모든 정보를 확인했습니다.</h4>}
      >
        {postingList}
      </InfiniteScroll>
    );
  }
}

export default connect(
  (state: any) => ({
    feedList: state.user.get("feedList")
    // mId: state.user.getIn(["loggedInfo", "mId"])
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Feed);
