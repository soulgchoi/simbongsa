import React, { Component } from "react";
import { List } from "immutable";
import { connect } from "react-redux";
// import * as volActions from "redux/modules/volunteer";
import * as volActions from "redux/modules/vol";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "components/posting/PostCard";
// import "containers/posting/PostingList.css";
interface Props {
  UserActions: any;
  feedList: List<any>;
  mId: number;
  match: any;
  preferFeedList: any;
  normalFeedList: any;
}
interface State { }

class Feed extends Component<Props, State> {
  state = {
    pageNum: 1
    // width: window.innerWidth,
    // height: window.innerHeight - 345
  };
  // v_id & 팔로우 여부로
  v_id = this.props.match.params.id;
  restAPI = process.env.REACT_APP_REST_BASE_API + "/rest/VolFeed/";
  async componentDidMount() {
    const { UserActions, mId } = this.props;
    const { pageNum } = this.state;
    await UserActions.getPreferFeedList(mId, pageNum);
    await UserActions.getNormalFeedList(mId, pageNum);
    this.setState({ pageNum: pageNum + 1 });
  }

  async loadMoreData() {
    const { UserActions, mId } = this.props;
    const { pageNum } = this.state;
    await UserActions.getPreferFeedList(mId, pageNum);
    await UserActions.getNormalFeedList(mId, pageNum);
    this.setState({ pageNum: pageNum + 1 });
  }

  render() {
    const preferFeedList = this.props.preferFeedList.toJS();
    const normalFeedList = this.props.normalFeedList.toJS();
    const { pageNum } = this.state;
    // 8 : 2 비율로 넣기
    let idx = 0; // idx가 8,9면 normal 넣기
    let idxP = 0;
    let idxN = 0;
    let pLength = preferFeedList.length;
    let nLength = normalFeedList.length;
    // const size = s1 + s2;
    let postingList: any[] = [];
    // preferFeedList.map((feed: any, i: any) => {
    //   return <Card post={feed} key={i} />;
    // });
    while (idxP < pLength || idxN < nLength) {
      for (let i = 0; i < 8; ++i) {
        // 8개 넣기, 그 전에 바닥나면 안넣음
        if (idxP === pLength) {
          break;
        }
        postingList.push(<PostCard color="white" post={preferFeedList[idxP]} key={idx} />);
        idx += 1;
        idxP += 1;
      }
      for (let i = 0; i < 2; ++i) {
        if (idxN === nLength) {
          break;
        }
        postingList.push(
          <PostCard color="#ffc164" post={normalFeedList[idxN]} key={idx} />
        );
        idx += 1;
        idxN += 1;
      }
    }
    return (
      <InfiniteScroll
        dataLength={postingList.length}
        next={this.loadMoreData.bind(this)}
        hasMore={pLength >= (pageNum - 1) * 8 || nLength >= (pageNum - 1) * 2}
        loader={<p>게시글 목록을 불러오는 중</p>}
        endMessage={<p>모든 정보를 확인했습니다.</p>}
      >
        {postingList}
      </InfiniteScroll>
    );
  }
}

export default connect(
  (state: any) => ({
    preferFeedList: state.user.get("preferFeedList"),
    normalFeedList: state.user.get("normalFeedList")
    // mId: state.user.getIn(["loggedInfo", "mId"])
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Feed);
