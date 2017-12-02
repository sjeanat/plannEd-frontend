import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './DashboardCalendarStyles.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default class DashboardCalendar extends Component {
  render() {
    const myEventsList = [
      {
        'title': 'All Day Event very long title',
        'allDay': true,
        'start': new Date(2017, 12, 0),
        'end': new Date(2017, 12, 1)
      },
      {
        'title': 'All another Event very long title',
        'allDay': true,
        'start': new Date(2017, 1, 12),
        'end': new Date(2017, 1, 14)
      }
    ]
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    return (
      <div className="dashboard-calendar">
        <BigCalendar
          events={myEventsList}
          startAccessor='startDate'
          endAccessor='endDate'
          selectable={true}
          onSelectSlot={this.props.slotSelected}
        />
      </div>
    )
  }

}
