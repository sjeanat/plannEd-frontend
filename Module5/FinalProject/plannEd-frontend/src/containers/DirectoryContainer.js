import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AssignmentList from '../components/AssignmentList';
import DirectorySearchForm from '../components/DirectorySearchForm';
import DirectoryCourses from '../components/DirectoryCourses';

class DirectoryContainer extends Component {

  render() {
    if (this.props.student.id) {
      return (
        <div className="course-container-wrapper">
          <DirectorySearchForm />
          <DirectoryCourses courses={this.props.directoryCourses} studentCourses={this.props.studentCourses} student={this.props.student}/>
        </div>
      )
    } else {
      return (
        <div/>
      )
    }
  };
};


function mapStateToProps(state) {
  console.log("CourseContainer state:", state)
  return {
    student: state.student,
    studentCourses: state.studentCourses,
    directoryCourses: state.directory.courses
  };
};

// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }

export default connect(mapStateToProps)(DirectoryContainer);
