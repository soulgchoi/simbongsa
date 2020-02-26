import React, { Component } from 'react'
import { Tab, Container, Sticky } from "semantic-ui-react";
import CalendarContainer from "containers/calendar/CalendarContainer";
import Location from "containers/location/Location";
import VolListPage from "containers/vollistpage/VolListPage";
import { list } from "react-immutable-proptypes";
import VolInfo from "components/map/VolInfo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as pageActions from "redux/modules/page";

interface Props {
  PageActions : any;
  currentTab : any; //pageActions.VolTab;
}
interface State {
  
}


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

class TabForMainPage extends Component<Props, State> {
  state = { activeIndex : 0 }
  componentDidMount(){
    const{ currentTab } = this.props;
    this.setState({activeIndex : currentTab}) // store에 저장해 둔 탭을 불러옴
  }
  handleTabChange = (e :any , { activeIndex } : any) => {
    const { PageActions } = this.props;
    PageActions.setCurrentTab(activeIndex); // 클릭한 탭을 store에 저장해 둠
    this.setState({activeIndex}); // 클릭한 탭으로 바꿔줌
  }
  render() {
    const { activeIndex } = this.state;
    return (
      <div>
        <div id="tab">
          <Container>
            <Tab
              panes={panes}
              activeIndex={activeIndex}
              onTabChange={this.handleTabChange}/>
          </Container>
         </div>
      </div>
    )
  }
}
export default connect(
  ({ page }: any) => {
    return {
      currentTab : page.get("currentTab")
    };
  },
  dispatch => ({
    PageActions: bindActionCreators(pageActions, dispatch)
  })
)(TabForMainPage);

