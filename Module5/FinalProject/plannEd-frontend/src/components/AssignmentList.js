import React, { Component } from 'react';
import AssignmentCard from './AssignmentCard';

export default class AssignmentList extends Component {
  render() {
    const assignments = this.props.assignments.map((assignment,idx) => {
      return <AssignmentCard key={idx} assignment={assignment} selectedAssignment={this.props.selectedAssignment} onFetchSubAssignments={this.props.onFetchSubAssignments} onCompleteAssignment={this.props.onCompleteAssignment} onSelectAssignment={this.props.onSelectAssignment} onDeselectAssignment={this.props.deselectAssignment}/>
    });
    return (
      <div>
        {assignments}
      </div>
    );
  };
};
