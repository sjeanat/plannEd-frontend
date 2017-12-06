import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import DashboardCalendar from '../components/DashboardCalendar';
import DirectorySearchForm from '../components/DirectorySearchForm';
import DirectoryCourses from '../components/DirectoryCourses';
import { removeAddConflict } from '../actions/students';
import MainNavBar from '../components/MainNavBar';
import NavBar from '../components/NavBar';
import { deselectForToDo, calendarClick, titleChange, selectSlot, submitToDo, startChange, endChange } from '../actions/students';

class DirectoryContainer extends Component {
  slotSelected = (slotInfo) => {
    console.log("slotSelected", slotInfo)
    this.props.onSelectSlot(slotInfo)
  }

  render() {
    const calProps = {slotSelected: this.slotSelected, setStartTime: this.setStartTime, setEndTime: this.setEndTime }
    if (this.props.addConflict) {
      alert(this.props.addConflict)
      this.props.onRemoveAddConflict()
    };

    if (this.props.student.id) {
      return (
        <div className="home-wrapper">
          <MainNavBar children={<DirectorySearchForm />} />
          <div className="content-wrapper">
            <NavBar {...this.props} activeTab="directory" />
            <div className="content-container">
              <DirectoryCourses history={this.props.history} courses={this.props.directoryCourses} studentCourses={this.props.studentCourses} student={this.props.student}/>
              <div className="dashboard-calendar-wrapper main-content">
                <DashboardCalendar courseFilter={this.props.courseFilter} defaultDate={this.props.defaultDate} onCalendarClick={this.props.onCalendarClick} calendar={this.props.calendar} {...calProps}/>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Redirect to="/"/>
      )
    }
  };
};


function mapStateToProps(state) {
  return {
    student: state.student,
    studentCourses: state.studentCourses,
    directoryCourses: state.directory.courses,
    addConflict: state.directory.addConflict,
    calendar: state.calendar,
    slotSelected: state.slotSelected,
    selectedSlot: state.selectedSlot,
    selectedForToDo: state.selectedForToDo,
    calendarClick: state.calendarClick,
    defaultDate: state.calendar.defaultDate,
    courseFilter: state.studentAssignments.courseFilter
  };
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
    },
    onRemoveAddConflict: () => {
      dispatch(removeAddConflict());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryContainer);
