import React from "react";
import { Tab } from "semantic-ui-react";
import CalendarContainer from "containers/calendar/CalendarContainer";
import Location from "containers/location/Location";
import VolListPage from "containers/vollistpage/VolListPage";
import { list } from "react-immutable-proptypes";
const panes = [
  {
    menuItem: {
      key: "list",
      content: "리스트",
      icon: "list alternate outline"
    },
    render: () => (
      <Tab.Pane>
        <VolListPage />
      </Tab.Pane>
    )
  },
  {
    menuItem: { key: "map", content: "지도", icon: "map outline" },
    render: () => (
      <Tab.Pane>
        <Location />
      </Tab.Pane>
    )
  },
  {
    menuItem: {
      key: "calendar",
      content: "달력",
      icon: "calendar alternate outline"
    },
    render: () => (
      <Tab.Pane>
        <CalendarContainer />
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
