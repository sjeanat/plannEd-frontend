import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchAssignments } from '../actions/students';
import AssignmentSearchForm from '../components/AssignmentSearchForm';
import AssignmentList from '../components/AssignmentList';

class AssignmentContainer extends Component {

  componentDidMount() {
    console.log("assignment container CDM")
    this.props.onFetchAssignments(this.props.student.id);
  };

  render() {
    return (
      <div className="assignment-container-wrapper">
        { this.props.student.id
          ?
            <div className="assignment-container">
              <AssignmentSearchForm courses={this.props.studentCourses} assignments={this.props.studentAssignments}/>
              <AssignmentList assignments={this.props.studentAssignments.display}/>
            </div>
          :
            <Redirect to="/home"/>
        }
      </div>
    );
  };
};


function mapStateToProps(state) {
  return {
    student: state.student,
    studentCourses: state.studentCourses,
    studentAssignments: state.studentAssignments
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onFetchAssignments: (studentId) => {
      dispatch(fetchAssignments(studentId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentContainer);
