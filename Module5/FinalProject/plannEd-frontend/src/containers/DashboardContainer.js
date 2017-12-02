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

  }

  setEndTime(field) {

  }

  render() {
    const props = {slotSelected: this.slotSelected, setStartTime: this.setStartTime, setEndTime: this.setEndTime }
    console.log("upcoming assignments", this.props.upcomingAssignments)
    return (
      <div>
        {this.props.student.id ? <AssignmentContainer /> : <Redirect to="/home"/>}
        {this.props.student.id ? <DashboardCalendar {...props}/> : <Redirect to="/home"/> }
      </div>
    );
  };
};



function mapStateToProps(state) {
  console.log("dashboard container state", state.upcomingAssignments)
  return {
    student: state.student
  }
};
//
// function mapDispatchToProps(dispatch) {
//   return {
//     }
//   }
// };

export default connect(mapStateToProps, null)(DashboardContainer);
