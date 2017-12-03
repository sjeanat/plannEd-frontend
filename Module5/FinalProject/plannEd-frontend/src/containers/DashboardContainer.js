import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import DashboardCalendar from '../components/DashboardCalendar';
import AssignmentContainer from './AssignmentContainer';


class DashboardContainer extends Component {

  slotSelected(slotInfo) {
    console.log(slotInfo)
  }

  setStartTime(field) {
    console.log(field.value)
  }

  setEndTime(field) {
    console.log(field.value)
  }

  render() {
    const calProps = {slotSelected: this.slotSelected, setStartTime: this.setStartTime, setEndTime: this.setEndTime }
    console.log("upcoming assignments", this.props.upcomingAssignments)
    return (
      <div>
        {this.props.addConflict ? <Redirect to="/course-directory"/> : null}
        {this.props.student.id ? <AssignmentContainer /> : <Redirect to="/home"/>}
        {this.props.student.id ? <DashboardCalendar calendar={this.props.calendar} {...calProps}/> : <Redirect to="/home"/> }
      </div>
    );
  };
};



function mapStateToProps(state) {
  return {
    student: state.student,
    calendar: state.calendar,
    addConflict: state.directory.addConflict
  }
};
//
// function mapDispatchToProps(dispatch) {
//   return {
//     }
//   }
// };

export default connect(mapStateToProps, null)(DashboardContainer);
