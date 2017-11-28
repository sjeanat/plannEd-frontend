import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssignments, fetchSubAssignments, completeAssignment, selectAssignment, changeAssignmentsDisplay } from '../actions/students';
import AssignmentSearchForm from '../components/AssignmentSearchForm';
import AssignmentList from '../components/AssignmentList';

class AssignmentContainer extends Component {

  componentDidMount() {
    this.props.onFetchAssignments(this.props.student.id);
  };

  render() {
    console.log("assignment container props", this.props)
    return (
      <div className="assignment-container-wrapper">
        { this.props.student.id
          ?
            <div className="assignment-container">
              <AssignmentSearchForm courses={this.props.studentCourses} assignments={this.props.studentAssignments}/>
              <AssignmentList assignments={this.props.studentAssignments.display} onCompleteAssignment={this.props.onCompleteAssignment} />
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
    studentAssignments: state.studentAssignments
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onFetchAssignments: (studentId) => {
      dispatch(fetchAssignments(studentId));
    },
    onCompleteAssignment: (studentAssignmentId) => {
      dispatch(completeAssignment(studentAssignmentId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentContainer);
