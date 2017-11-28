import React, { Component } from 'react';
import AssignmentCard from './AssignmentCard';

export default class AssignmentList extends Component {
  render() {
    const assignments = this.props.assignments.map((assignment,idx) => {
      return <AssignmentCard key={idx} assignment={assignment} onCompleteAssignment={this.props.onCompleteAssignment} />
    });
    return (
      <div>
        {assignments}
      </div>
    );
  };
};
