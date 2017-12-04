import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

// Components
import AssignmentContainer from './AssignmentContainer';
import DashboardCalendar from '../components/DashboardCalendar';
import NavBar from '../components/NavBar';

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
    return (
      <div className="dashboard-container">
        <NavBar {...this.props} activeTab="assignments" />
        {this.props.addConflict ? <Redirect to="/course-directory"/> : null}
        {this.props.student.id ? <AssignmentContainer /> : <Redirect to="/"/>}
        {this.props.student.id ? <DashboardCalendar calendar={this.props.calendar} {...calProps}/> : <Redirect to="/"/> }
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
