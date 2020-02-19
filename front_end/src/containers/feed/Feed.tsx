import React, { Component } from "react";
import { List } from "immutable";
import VolList from "components/vol/VolList";
import { connect } from "react-redux";
// import * as volActions from "redux/modules/volunteer";
import * as volActions from "redux/modules/vol";
import * as userActions from "redux/modules/user";
import { bindActionCreators } from "redux";
interface Props {
  UserActions: any;
  feedList: List<any>;
  mId: number;
}
interface State {}

class Feed extends Component<Props, State> {
  state = {
    pageNum: 1
    // width: window.innerWidth,
    // height: window.innerHeight - 345
  };

  componentDidMount() {
    const { UserActions, mId } = this.props;
    const { pageNum } = this.state;
    UserActions.getFeedList(mId, pageNum);
    // window.addEventListener("resize", this.updateDimensions); // 화면 크기를 바꿀 때 높이 동적 반영에 필요한 코드
  }
  shouldComponentUpdate(nextProps: any) {
    const { feedList } = nextProps;
    return feedList.size > 0;
  }
  loadMoreData = () => {
    this.setState({ pageNum: this.state.pageNum + 1 });
    const { UserActions } = this.props;
    UserActions.appendList(this.state.pageNum);
  };

  // // 화면 크기를 바꿀 때 높이 동적 반영에 필요한 코드
  // updateDimensions = () => {
  //   this.setState({
  //     width: window.innerWidth,
  //     height: window.innerHeight - 345
  //   });
  // };
  // // 화면 크기를 바꿀 때 높이 동적 반영에 필요한 코드
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.updateDimensions);
  // }

  render() {
    const { feedList } = this.props;
    const { loadMoreData } = this;
    console.log("피드들", feedList.toJS());
    return (
      <div>
        <VolList
          volunteers={feedList.toJS()}
          appendList={loadMoreData}
          height={"59vh"}
          loadingMessage="피드 정보 불러오는 중"
        />
      </div>
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
