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

const panes = (userId :string) =>{ return [
  {
    menuItem: {
      key: "vollist",
      content: "봉사활동",
      icon: "group"
    },
    render: () => <Tab.Pane><MyVol userId={userId}/></Tab.Pane>
  },
  {
    menuItem: {
      key: "posting", content: "게시글",
      icon: "write"
    },
    render: () => <Tab.Pane><MyPost userId={userId}/></Tab.Pane>
  },
  {
    menuItem: {
      key: "calendar",
      content: "봉사통계",
      icon: "pie graph"
    },
    render: () => (
      <Tab.Pane>
        <Statistics userId={userId}/>
      </Tab.Pane>
    )
  }
]
};

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
    const{ userId } = this.props;
    return (
      <div id="tab">
        <Tab panes={panes(userId)} />
      </div>
    );
  }
}


export default connect(
  ({ user, vol }: any) => ({
    volListByUserId: vol.get("volListByUserId")
  }),
  dispatch => ({
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(TabExampleBasic);

