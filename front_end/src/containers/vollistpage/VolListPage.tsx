import React, { Component } from "react";
import { List } from "immutable";
import VolList from "components/vol/VolList";
import { connect } from "react-redux";
// import * as volActions from "redux/modules/volunteer";
import * as volActions from "redux/modules/vol";
import { bindActionCreators } from "redux";
interface Props {
  VolActions: any;
  volunteers: List<any>;
}
interface State {}

class VolListPage extends Component<Props, State> {
  state = {
    pageNum: 1,
    width: window.innerWidth,
    height: window.innerHeight - 345
  };

  componentDidMount() {
    const { VolActions } = this.props;
    VolActions.getInitailList(this.state.pageNum);
    window.addEventListener("resize", this.updateDimensions); // 화면 크기를 바꿀 때 높이 동적 반영에 필요한 코드
  }
  shouldComponentUpdate(nextProps: any) {
    const { volunteers } = nextProps;
    return volunteers.size > 0;
  }
  loadMoreData = () => {
    this.setState({ pageNum: this.state.pageNum + 1 });
    const { VolActions } = this.props;
    VolActions.appendList(this.state.pageNum);
    console.log(this.props.volunteers);
  };

  // 화면 크기를 바꿀 때 높이 동적 반영에 필요한 코드
  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 345
    });
  };
  // 화면 크기를 바꿀 때 높이 동적 반영에 필요한 코드
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { volunteers } = this.props;
    const { loadMoreData } = this;
    console.log("봉사자들", volunteers);
    return (
      <div>
        <VolList
          loadingMessage="봉사활동 목록을 불러오는중"
          volunteers={volunteers.toJS()}
          appendList={loadMoreData}
          height={"59vh"}
        />
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    volunteers: state.vol.get("volunteers")
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(VolListPage);
