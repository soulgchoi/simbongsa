import React from "react";
import { Tab, Container, Sticky } from "semantic-ui-react";
import CalendarContainer from "containers/calendar/CalendarContainer";
import Location from "containers/location/Location";
import VolListPage from "containers/vollistpage/VolListPage";
import { list } from "react-immutable-proptypes";
import VolInfo from "components/map/VolInfo";
const panes = [
  {
    menuItem: {
      key: "list",
      content: "리스트",
      icon: "list alternate outline"
    },
    render: () => (
      <Tab.Pane >
        <Container text>
          <VolListPage />
        </Container>
      </Tab.Pane>
    )
  },
  {
    menuItem: { key: "map", content: "지도", icon: "map outline" },
    render: () => (
      <Tab.Pane>
        <Container text>
          <Location />
          <VolInfo />
        </Container>
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
        <Container text>
          <CalendarContainer />
        </Container>
      </Tab.Pane>
    )
  }
];

const TabExampleBasic = () => (
  <div id="tab">
    <Container>
      <Tab panes={panes} />
    </Container>
  </div>
);

export default TabExampleBasic;
