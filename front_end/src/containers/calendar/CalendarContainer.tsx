import React from 'react';
import moment, { Moment as MomentTypes } from "moment";

import { connect } from 'react-redux';
import { changeDate } from 'redux/modules/calendar';
import { bindActionCreators } from 'redux';
import Calendar from 'components/calendar';
import VolList from '../mainpage/VolList';
interface Props {
    date: MomentTypes
    changeDate: typeof changeDate
}
class CalendarContainer extends React.Component<Props> {

    componentDidMount() {
        //this.props.changeDate(moment().add(1, 'month'))
    }
    listShow() {

    }
    render() {
        const { props } = this;
        return (
            <div>
                <Calendar date={props.date} changeDate={props.changeDate} />
                <VolList />
            </div>
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