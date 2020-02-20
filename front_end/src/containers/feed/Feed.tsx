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
  preferFeedList: any;
  normalFeedList: any;
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
    UserActions.getPreferFeedList(mId, pageNum);
    UserActions.getNormalFeedList(mId, pageNum);
    this.setState({ pageNum: pageNum + 1 });
  }

  loadMoreData() {
    const { UserActions, mId } = this.props;
    const { pageNum } = this.state;
    UserActions.getPreferFeedList(mId, pageNum);
    UserActions.getNormalFeedList(mId, pageNum);
    this.setState({ pageNum: pageNum + 1 });
  }

  render() {
    const preferFeedList = this.props.preferFeedList.toJS();
    const normalFeedList = this.props.normalFeedList.toJS();
    console.log("노말입니다", normalFeedList);
    // 8 : 2 비율로 넣기
    let idx = 0; // idx가 8,9면 normal 넣기
    let idxP = 0;
    let idxN = 0;
    let pLength = preferFeedList.length;
    let nLength = normalFeedList.length;
    console.log("리스트", preferFeedList.length, normalFeedList.length);
    // const size = s1 + s2;
    // console.log("사이즈", size);
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
        postingList.push(<Card post={preferFeedList[idxP]} key={idx} />);
        idx += 1;
        idxP += 1;
      }
      for (let i = 0; i < 2; ++i) {
        if (idxN === nLength) {
          break;
        }
        postingList.push(<Card post={normalFeedList[idxN]} key={idx} />);
        idx += 1;
        idxN += 1;
      }
    }
    // for (let i = 0; i < size; ++i) {
    //   console.log("여기");
    //   if (idx < 8 || idxN >= normalFeedList.length) {
    //     postingList.push(<Card post={preferFeedList[idxP]} key={i} />);
    //     idxP = idxP + 1;
    //   }
    //   if (idx >= 8 || idxP >= preferFeedList.length) {
    //     postingList.push(<Card post={normalFeedList[idxN]} key={i} />);
    //     idxN = idxN + 1;
    //   }
    //   idx = idx + 1;
    //   if (idx > 9) {
    //     idx = 0;
    //   }
    // }
    console.log("포스팅 리스트", postingList);
    return (
      <InfiniteScroll
        dataLength={postingList.length}
        next={this.loadMoreData.bind(this)}
        hasMore={postingList.length >= this.state.pageNum * 10}
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
    preferFeedList: state.user.get("preferFeedList"),
    normalFeedList: state.user.get("normalFeedList")
    // mId: state.user.getIn(["loggedInfo", "mId"])
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Feed);
