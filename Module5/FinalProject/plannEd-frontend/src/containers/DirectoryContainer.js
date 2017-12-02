import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import DirectorySearchForm from '../components/DirectorySearchForm';
import DirectoryCourses from '../components/DirectoryCourses';

class DirectoryContainer extends Component {

  render() {
    if (this.props.student.id) {
      return (
        <div className="course-container-wrapper">
          <DirectorySearchForm />
          <DirectoryCourses history={this.props.history} courses={this.props.directoryCourses} studentCourses={this.props.studentCourses} student={this.props.student}/>
        </div>
      )
    } else {
      return (
        <Redirect to="/home"/>
      )
    }
  };
};


function mapStateToProps(state) {
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
