import React from 'react';
import moment, { Moment as MomentTypes } from "moment";

import { connect } from 'react-redux';
import { changeDate } from 'redux/modules/calendar';
import { bindActionCreators } from 'redux';
import Calendar from 'components/Calendar';

interface Props {
    date: MomentTypes
    changeDate: typeof changeDate
}
class CalendarContainer extends React.Component<Props> {

    componentDidMount() {
        //this.props.changeDate(moment().add(1, 'month'))
    }
    render() {
        const { props } = this;
        return (
            <Calendar date={props.date} changeDate={props.changeDate} />
        )
    }
}


export default connect(
    ({ calendar }: any) => ({
        date: calendar.date
    }),
    (dispatch) => ({
        changeDate: bindActionCreators(changeDate, dispatch)
    })
)(CalendarContainer);