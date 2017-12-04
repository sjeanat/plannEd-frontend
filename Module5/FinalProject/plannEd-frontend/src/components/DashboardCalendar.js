import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './DashboardCalendarStyles.css';


export default class DashboardCalendar extends Component {
  render() {
    BigCalendar.momentLocalizer(moment);
    const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    const calEvents = [...this.props.calendar.courses, ...this.props.calendar.dueDates, ...this.props.calendar.toDoItems].map(date => ({
      title: date.title,
      eventType: date.eventType,
      startDate: new Date(...date.startDate),
      endDate: new Date(...date.endDate)
    }))
    console.log("calendar dates:", calEvents)

    return (
      <div className="dashboard-calendar">
        <BigCalendar
          selectable
          events={calEvents}
          startAccessor='startDate'
          endAccessor='endDate'
          selectable={true}
          step={60}
          onSelectSlot={this.props.slotSelected}
          onSelectEvent={event => alert(event.title)}
          views={allViews}
          defaultDate={new Date(2017, 10, 1)}
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
