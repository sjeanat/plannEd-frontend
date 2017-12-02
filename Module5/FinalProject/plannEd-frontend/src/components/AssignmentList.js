import React, { Component } from 'react';
import AssignmentCard from './AssignmentCard';

export default class AssignmentList extends Component {
  render() {
    const assignments = this.props.assignments.map((assignment,idx) => {
      return <AssignmentCard key={idx} onCompleteParent={this.props.onCompleteParent} studentAssignments={this.props.studentAssignments} assignment={assignment} selectedAssignment={this.props.selectedAssignment} onFetchSubAssignments={this.props.onFetchSubAssignments} onCompleteAssignment={this.props.onCompleteAssignment} onCompleteSubAssignment={this.props.onCompleteSubAssignment} onSelectAssignment={this.props.onSelectAssignment} onDeselectAssignment={this.props.onDeselectAssignment} onDeselectSubAssignment={this.props.onDeselectSubAssignment}/>
    });
    return (
      <div>
        {assignments}
      </div>
    );
  };
};
