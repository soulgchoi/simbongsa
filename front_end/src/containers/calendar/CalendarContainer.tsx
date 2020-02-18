import React from "react";
import moment, { Moment as MomentTypes } from "moment";
import { List } from "immutable";
import { connect } from "react-redux";
import { changeDate, changeToggle } from "redux/modules/calendar";
import { bindActionCreators } from "redux";
import Calendar from "components/calendar/Calendar";
import * as volActions from "redux/modules/vol";
import VolList from "components/vol/VolList";
interface Props {
  date: MomentTypes;
  changeDate: typeof changeDate;
  changeToggle: typeof changeToggle;
  toggle: boolean;
  volunteers: List<any>;
  VolActions: typeof volActions;
  volunteersForCal: any;
}
class CalendarContainer extends React.Component<Props, any> {
  state = {
    pageNum: 1,
    width: window.innerWidth,
    height: window.innerHeight - 345
  };
  componentDidMount() {
    //this.props.changeDate(moment().add(1, 'month'))
  }
  loadMoreData = () => {
    this.setState({ pageNum: this.state.pageNum + 1 });
    const { VolActions } = this.props;
    VolActions.appendList(this.state.pageNum);
    console.log(this.props.volunteers);
  };
  calActions = (date: any, toggle: any, vol?: any) => {
    const { changeDate, changeToggle, VolActions } = this.props;
    console.log("calActions", date, toggle, vol);
    changeDate(date);
    changeToggle(toggle);
    VolActions.dayVolList(vol);
  };
  render() {
    const { props, loadMoreData } = this;

    console.log("container props", props.toggle);
    console.log("volunteers입니다", props.volunteers.toJS());
    return (
      <div>
        <Calendar
          date={props.date}
          changeDate={props.changeDate}
          changeToggle={props.changeToggle}
          dayVolList={props.VolActions.dayVolList}
          toggle={props.toggle}
          volunteers={props.volunteers}
          calActions={this.calActions}
        />
        {props.toggle && (
          <VolList
            loadingMessage="봉사활동 정보 불러오는 중"
            volunteers={props.volunteersForCal}
            appendList={loadMoreData}
            height={"59vh"}
          />
        )}
      </div>
    );
  }
}

export default connect(
  ({ calendar, vol }: any) => ({
    date: calendar.date,
    toggle: calendar.toggle,
    volunteers: vol.get("volunteers"),
    volunteersForCal: vol.get("volunteersForCal")
  }),
  dispatch => ({
    changeDate: bindActionCreators(changeDate, dispatch),
    changeToggle: bindActionCreators(changeToggle, dispatch),
    VolActions: bindActionCreators(volActions, dispatch)
  })
)(CalendarContainer);
