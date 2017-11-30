import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssignments, fetchSubAssignments, completeAssignment, completeSubAssignment, selectAssignment, deselectAssignment, deselectSubAssignment } from '../actions/students';
import AssignmentSearchForm from '../components/AssignmentSearchForm';
import AssignmentList from '../components/AssignmentList';

class AssignmentContainer extends Component {

  componentDidMount() {
    this.props.onFetchAssignments(this.props.student.id);
  };

  render() {
    return (
      <div className="assignment-container-wrapper">
        { this.props.student.id
          ?
            <div className="assignment-container">
              <AssignmentSearchForm courses={this.props.studentCourses} assignments={this.props.studentAssignments}/>
              <AssignmentList onCompleteSubAssignment={this.props.onCompleteSubAssignment} selectedAssignment={this.props.selectedAssignment} assignments={this.props.studentAssignments.display} onFetchSubAssignments={this.props.onFetchSubAssignments} onCompleteAssignment={this.props.onCompleteAssignment} onSelectAssignment={this.props.onSelectAssignment} onDeselectAssignment={this.props.onDeselectAssignment} onDeselectSubAssignment={this.props.onDeselectSubAssignment}/>
            </div>
          :
            null
        }
      </div>
    );
  };
};


function mapStateToProps(state) {
  return {
    student: state.student,
    studentCourses: state.studentCourses,
    studentAssignments: state.studentAssignments,
    selectedAssignment: state.selectedAssignment
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onFetchAssignments: (studentId) => {
      dispatch(fetchAssignments(studentId));
    },
    onCompleteAssignment: (studentAssignmentId) => {
      dispatch(completeAssignment(studentAssignmentId));
    },
    onCompleteSubAssignment: (studentAssignmentId) => {
      dispatch(completeSubAssignment(studentAssignmentId));
    },
    onSelectAssignment: (studentAssignmentId) => {
      dispatch(selectAssignment(studentAssignmentId));
    },
    onDeselectAssignment: () => {
      dispatch(deselectAssignment());
    },
    onFetchSubAssignments: (studentAssignmentId) => {
      dispatch(fetchSubAssignments(studentAssignmentId));
    },
    onDeselectSubAssignment: (studentAssignmentId) => {
      dispatch(deselectSubAssignment(studentAssignmentId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentContainer);
