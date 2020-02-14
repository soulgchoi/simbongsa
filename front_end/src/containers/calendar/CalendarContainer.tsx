import React from "react";
import moment, { Moment as MomentTypes } from "moment";

import { connect } from "react-redux";
import calendar, { changeDate } from "redux/modules/calendar";
import { bindActionCreators } from "redux";
import Calendar from "components/calendar/Calendar";
import VolList from "../mainpage/VolList";
interface Props {
  date: MomentTypes;
  changeDate: typeof changeDate;
  toggle: boolean;
}
class CalendarContainer extends React.Component<Props> {
  componentDidMount() {
    //this.props.changeDate(moment().add(1, 'month'))
  }
  listShow() {}
  render() {
    const { props } = this;
    console.log("container props", props);
    return (
      <div>
        <Calendar
          date={props.date}
          changeDate={props.changeDate}
          toggle={props.toggle}
        />
        {props.toggle && <VolList />}
      </div>
    );
  }
}

export default connect(
  ({ calendar }: any) => ({
    date: calendar.date,
    toggle: calendar.toggle
  }),
  dispatch => ({
    changeDate: bindActionCreators(changeDate, dispatch)
  })
)(CalendarContainer);
