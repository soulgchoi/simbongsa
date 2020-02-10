<<<<<<< HEAD
import React, { Fragment } from 'react';
import moment, { Moment as MomentTypes } from "moment";

import { connect } from 'react-redux';
import { changeDate } from 'redux/modules/calendar';
import { bindActionCreators } from 'redux';
import Calendar from 'components/Calendar/Calendar';
import VolList from 'containers/mainpage/VolList';

=======
import React from "react";
import moment, { Moment as MomentTypes } from "moment";

import { connect } from "react-redux";
import calendar, { changeDate } from "redux/modules/calendar";
import { bindActionCreators } from "redux";
import Calendar from "components/calendar/Calendar";
import VolList from "../mainpage/VolList";
>>>>>>> 5a5c88a761fbff973ce598349877db8be8f4615a
interface Props {
  date: MomentTypes;
  changeDate: typeof changeDate;
  toggle: boolean;
}
class CalendarContainer extends React.Component<Props> {
<<<<<<< HEAD

    componentDidMount() {
        //this.props.changeDate(moment().add(1, 'month'))
    }
    render() {
        const { props } = this;
        return (
            <Fragment>
            <Calendar date={props.date} changeDate={props.changeDate} />
            <VolList/>
            </Fragment>
        )
    }
=======
  componentDidMount() {
    //this.props.changeDate(moment().add(1, 'month'))
  }
  listShow() { }
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
>>>>>>> 5a5c88a761fbff973ce598349877db8be8f4615a
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
