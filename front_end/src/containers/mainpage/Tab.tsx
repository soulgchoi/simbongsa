import React from 'react'
import { Tab } from 'semantic-ui-react'
import CalendarContainer from 'containers/calendar/CalendarContainer';
import Location from 'containers/location/Location';
const panes = [
    { menuItem: '지도', render: () => <Tab.Pane><Location /></Tab.Pane> },
    { menuItem: '달력', render: () => <Tab.Pane><CalendarContainer /></Tab.Pane> }
]

const TabExampleBasic = () => <Tab panes={panes} />

export default TabExampleBasic