import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCourse, fetchAssignments, fetchSubAssignments, fetchDirectorySubjects, fetchDirectoryCourses, completeAssignment, selectAssignment, selectCourse } from '../actions/students';
import AssignmentList from '../components/AssignmentList';
import AssignmentCard from '../components/AssignmentCard';

class AssignmentContainer extends Component {

  render() {
    if (this.props.student.id) {
      return (
        <div className="assignment-container-wrapper">
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  };
};


function mapStateToProps(state) {
  console.log("AssignmentContainer state:", state)
  return {
    student: state.student,
    studentCourses: state.studentCourses
  };
};

// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }

export default connect(mapStateToProps)(AssignmentContainer);
