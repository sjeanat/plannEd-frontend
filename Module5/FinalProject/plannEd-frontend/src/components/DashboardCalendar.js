import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './DashboardCalendarStyles.css';
import $ from 'jquery';


export default class DashboardCalendar extends Component {
  componentDidMount() {
    let calendarDOMObject = $('.rbc-calendar')
    calendarDOMObject.on("click", (event) => {
      console.log(event.originalEvent.screenX, event.originalEvent.screenY)
      this.props.onCalendarClick(event.originalEvent.screenX, event.originalEvent.screenY)
    });
  };

  getEventColor = (event) => {
    const color = event.color;
    return { style: { backgroundColor: color, border: color } }
  };

  render() {
    BigCalendar.momentLocalizer(moment);
    const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
    const calEvents = [...this.props.calendar.courses, ...this.props.calendar.dueDates, ...this.props.calendar.toDoItems].map(date => ({
      title: date.title,
      eventType: date.eventType,
      startDate: new Date(...date.startDate),
      endDate: new Date(...date.endDate),
      color: date.color
    }));
    // ["month", "week", "work_week", "day", "agenda"]
    const defaultDate = !!this.props.defaultDate ? this.props.defaultDate : new Date("9/04/2017")
    return (
      <div className="dashboard-calendar">
        <BigCalendar
          selectable
          popup
          eventPropGetter={this.getEventColor}
          events={calEvents}
          startAccessor='startDate'
          endAccessor='endDate'
          selectable={true}
          step={60}
          onSelectSlot={this.props.slotSelected}
          onSelectEvent={event => alert(event.title)}
          views={allViews}
          defaultDate={defaultDate}
        />
      </div>
    )
  }

}

//
// event format:
// need to add color/label
// {
//   'title': 'All day very long',
//   'allDay': true,
//   'startDate': new Date(2017, 3, 0),
//   'endDate':  new Date(2017, 3, 1)
// }
