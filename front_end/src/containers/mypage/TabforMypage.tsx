import React from "react";
import { Tab } from "semantic-ui-react";
import { list } from "react-immutable-proptypes";
import Statistics from "containers/mypage/Statistics";
import Feed from "containers/feed/Feed";

const panes = [
  {
    menuItem: {
      key: "vollist",
      content: "봉사활동",
      icon: "group"
    },
    render: () => <Tab.Pane></Tab.Pane>
  },
  {
    menuItem: { key: "posting", content: "게시글", icon: "write" },
    render: () => <Tab.Pane></Tab.Pane>
  },
  {
    menuItem: {
      key: "calendar",
      content: "통계",
      icon: "pie graph"
    },
    render: () => (
      <Tab.Pane>
        <Statistics />
      </Tab.Pane>
    )
  }
];

const TabExampleBasic = () => (
  <div id="tab">
    <Tab panes={panes} />
  </div>
);

export default TabExampleBasic;
