import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubAssignmentCard from './SubAssignmentCard';
import { selectForToDo, completeParent, fetchAssignments, fetchSubAssignments, completeAssignment, completeSubAssignment, selectAssignment, deselectAssignment, deselectSubAssignment } from '../actions/students';


class AssignmentCard extends Component {

  handleParentComplete = () => {
    this.props.onCompleteParent(this.props.assignment.studentAssignmentId)
  };

  handleComplete = () => {
    this.props.onCompleteAssignment(this.props.assignment.studentAssignmentId);
  };

  handleSelectAssignment = () => {
    this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId, true)
  };

  handleDeselectAssignment = () => {
    this.props.onDeselectAssignment();
  };

  showSubAssignments = () => {
    const arr = this.props.selectedAssignment.subAssignments.map((subAss, idx) => {
      return <SubAssignmentCard key={idx} {...this.props}/>
    });
    return arr;
  };

  handleAddToDo = () => {
    this.props.onSelectForToDo(this.props.assignment)
  };

  render() {
    return (
      <div>
        <h2>{this.props.assignment.title}</h2>
        <p>{this.props.assignment.dueDate}</p>
        <p>{this.props.assignment.description}</p>
        <button onClick={this.handleAddToDo}>{this.props.selectedForToDo && this.props.selectedForToDo.studentAssignmentId === this.props.assignment.studentAssignmentId ? "Add To Calendar" : "+ To Do"}</button>
        {this.props.assignment.hasSubAssignments
          ?
            <div>
              <button onClick={this.handleParentComplete}>{this.props.assignment.completed ? "Completed!" : "Complete Sub-Assignments"}</button>
              {(this.props.selectedAssignment.id.length > 0 && this.props.selectedAssignment.id[0][0] === this.props.assignment.studentAssignmentId)
                ?
                  <div>
                    <button onClick={this.handleDeselectAssignment}>Hide Sub-Assignments</button>
                    {this.showSubAssignments()}
                  </div>
                :
                  <div>
                    <button onClick={this.handleSelectAssignment}>See Sub-Assignments</button>
                  </div>
              }
            </div>
          :
            <button onClick={this.handleComplete}>{this.props.assignment.completed ? "Completed!" : "Complete"}</button>
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
    selectedAssignment: state.selectedAssignment,
    selectedForToDo: state.selectedForToDo
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onCompleteAssignment: (studentAssignmentId) => {
      dispatch(completeAssignment(studentAssignmentId));
    },
    onCompleteSubAssignment: (studentAssignmentId, rootAssignmentIds, subAssignmentIds) => {
      dispatch(completeSubAssignment(studentAssignmentId, rootAssignmentIds, subAssignmentIds));
    },
    onCompleteParent: (studentAssignmentId) => {
      dispatch(completeParent(studentAssignmentId));
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
    },
    onSelectForToDo: (studentAssignment) => {
      dispatch(selectForToDo(studentAssignment));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentCard);

// //for sub assignments
// selectedForToDo={this.props.selectedForToDo} onSelectForToDo={this.props.onSelectForToDo} onCompleteParent={this.props.onCompleteParent} studentAssignments={this.props.studentAssignments} onCompleteSubAssignment={this.props.onCompleteSubAssignment} selectedAssignment={this.props.selectedAssignment} assignment={subAss.assignment} parentId={subAss.parentId} onFetchSubAssignments={this.props.onFetchSubAssignments} onDeselectSubAssignment={this.props.onDeselectSubAssignment}
//
//
// //for both
// selectedForToDo
// onSelectForToDo={this.props.onSelectForToDo} onCompleteParent={this.props.onCompleteParent} studentAssignments={this.props.studentAssignments} onCompleteSubAssignment={this.props.onCompleteSubAssignment} selectedAssignment={this.props.selectedAssignment} assignments={this.props.studentAssignments.display} onFetchSubAssignments={this.props.onFetchSubAssignments} onCompleteAssignment={this.props.onCompleteAssignment} onSelectAssignment={this.props.onSelectAssignment} onDeselectAssignment={this.props.onDeselectAssignment} onDeselectSubAssignment={this.props.onDeselectSubAssignment}
