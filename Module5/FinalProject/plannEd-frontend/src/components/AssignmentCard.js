import React, { Component } from 'react';

export default class AssignmentCard extends Component {

  handleComplete = () => {
    this.props.onCompleteAssignment(this.props.assignment.studentAssignmentId);
  };

  render() {
    return (
      <div>
        <h2>{this.props.assignment.title}</h2>
        <p>{this.props.assignment.dueDate}</p>
        <p>{this.props.assignment.description}</p>
        <button onClick={this.handleComplete}>{this.props.assignment.completed ? "Completed!" : "Complete"}</button>
      </div>
    );
  };
};
