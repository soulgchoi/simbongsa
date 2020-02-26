import React from "react";
import { Tab } from "semantic-ui-react";
import { list } from "react-immutable-proptypes";
import Statistics from "containers/mypage/Statistics";
import MyVol from "containers/mypage/MyVol";
import MyPost from "containers/mypage/MyPost";
import Feed from "containers/feed/Feed";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as volActions from "redux/modules/vol";

const panes = [
  {
    menuItem: {
      key: "vollist",
      content: "나의 봉사",
      icon: "group"
    },
    render: () => <Tab.Pane><MyVol /></Tab.Pane>
  },
  {
    menuItem: {
      key: "posting", content: "내 게시글",
      icon: "write"
    },
    render: () => <Tab.Pane><MyPost /></Tab.Pane>
  },
  {
    menuItem: {
      key: "calendar",
      content: "봉사 통계",
      icon: "pie graph"
    },
    render: () => (
      <Tab.Pane>
        <Statistics />
      </Tab.Pane>
    )
  }
];

interface Props {
  VolActions: any;
  userId: string;
}
interface State {

}
class TabExampleBasic extends React.Component<Props, State> {
  componentDidMount() {
    const { VolActions, userId } = this.props;
    VolActions.getVolListByUserId(userId);
  }
  public render() {
    return (
      <div id="tab">
        <Tab panes={panes} />
      </div>
    );
  }
}


export default connect(
  ({ user, vol }: any) => ({
    userId: user.getIn(["loggedInfo", "userId"]),
    volListByUserId: vol.get("volListByUserId")
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(TabExampleBasic);

