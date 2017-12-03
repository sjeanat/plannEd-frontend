import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './DashboardCalendarStyles.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
 // or globalizeLocalizer

export default class DashboardCalendar extends Component {
  render() {
    BigCalendar.momentLocalizer(moment);
    const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    const calEvents = [...this.props.calendar.courses, ...this.props.calendar.dueDates]

    return (
      <div className="dashboard-calendar">
        <BigCalendar
          events={calEvents}
          startAccessor='startDate'
          endAccessor='endDate'
          selectable={true}
          step={60}
          onSelectSlot={this.props.slotSelected}
          views={allViews}
          defaultDate={new Date(2017, 3, 4)}
        />
      </div>
    )
  }

}

//
// event format:
// {
//   'title': 'All day very long',
//   'allDay': true,
//   'startDate': new Date(2017, 3, 0),
//   'endDate':  new Date(2017, 3, 1)
// }
