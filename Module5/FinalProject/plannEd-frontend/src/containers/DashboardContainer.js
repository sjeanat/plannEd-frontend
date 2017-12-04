import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import DashboardCalendar from '../components/DashboardCalendar';
import AssignmentContainer from './AssignmentContainer';
import NavBar from '../components/NavBar';
import { deselectForToDo, calendarClick, titleChange, selectSlot, submitToDo, startChange, endChange } from '../actions/students';



class DashboardContainer extends Component {

  slotSelected = (slotInfo) => {
    console.log("slotSelected", slotInfo)
    this.props.onSelectSlot(slotInfo)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit to do", this.props.selectedSlot)
    const selectedSlot = this.props.selectedSlot;
    const toDoTime = `${this.props.selectedSlot.startTime}:${this.props.selectedSlot.endTime}`;
    this.props.onSubmitToDo(selectedSlot.info.start.toLocaleDateString(), toDoTime, this.props.selectedForToDo, selectedSlot.title);
  };

  handleStartChange = (event) => {
    console.log(event.target.value)
    this.props.onStartChange(event.target.value);
  }

  handleEndChange = (event) => {
    console.log(event.target.value)
    this.props.onEndChange(event.target.value);
  }

  handleTitleChange = (event) => {
    this.props.onTitleChange(event.target.value);
  };

  handleCloseForm = (event) => {
    this.props.onDeselectForToDo();
  };

  render() {
    const formCss = `
    .to-do-form-wrapper {
      position: absolute;
      height: 200px;
      width: 200px;
      left: ${this.props.calendarClick.x}px;
      top: ${this.props.calendarClick.y - 90}px;
      z-index: 100;
      background: red;
    }
    `
    const calProps = {slotSelected: this.slotSelected, setStartTime: this.setStartTime, setEndTime: this.setEndTime }
    return (
      <div className="dashboard-container">
          <style>{formCss}</style>
          {this.props.slotSelected && (this.props.selectedForToDo !== 0)
            ?
              <div className="to-do-form-wrapper assignment" >
                <form onSubmit={this.handleSubmit}>
                  Title:
                  <input type="text" value={this.props.selectedSlot.title} onChange={this.handleTitleChange}/>
                  <br/>
                  Start Time:
                  <input type="time" value={this.props.selectedSlot.startTime} onChange={this.handleStartChange}/>
                  <br/>
                  End Time:
                  <input type="time" value={this.props.selectedSlot.endTime} onChange={this.handleEndChange}/>
                  <br/>
                  <input type="submit" value="Create To Do!"/>
                  <p onClick={this.handleCloseForm}>X</p>
                </form>
              </div>
            : null
          }
        <NavBar {...this.props} activeTab="dashboard" />
        {this.props.student.id ? <AssignmentContainer /> : <Redirect to="/"/>}
        {this.props.addConflict ? <Redirect to="/course-directory"/> : null}
        {this.props.student.id ? <DashboardCalendar courseFilter={this.props.courseFilter} defaultDate={this.props.defaultDate} onCalendarClick={this.props.onCalendarClick} calendar={this.props.calendar} {...calProps}/> : <Redirect to="/"/> }
      </div>
    );
  };
};

        // {this.props.student.id ? <AssignmentContainer /> : <Redirect to="/"/>}



function mapStateToProps(state) {

  return {
    student: state.student,
    calendar: state.calendar,
    addConflict: state.directory.addConflict,
    slotSelected: state.slotSelected,
    selectedSlot: state.selectedSlot,
    selectedForToDo: state.selectedForToDo,
    calendarClick: state.calendarClick,
    defaultDate: state.calendar.defaultDate,
    courseFilter: state.studentAssignments.courseFilter
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onSelectSlot: (slotInfo) => {
      dispatch(selectSlot(slotInfo));
    },
    onSubmitToDo: (date, time, studentAssignmentId, title) => {
      dispatch(submitToDo(date, time, studentAssignmentId, title));
    },
    onStartChange: (startTime) => {
      dispatch(startChange(startTime));
    },
    onEndChange: (endTime) => {
      dispatch(endChange(endTime));
    },
    onTitleChange: (title) => {
      dispatch(titleChange(title));
    },
    onCalendarClick: (xPos, yPos) => {
      dispatch(calendarClick(xPos, yPos));
    },
    onDeselectForToDo: () => {
      dispatch(deselectForToDo());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
