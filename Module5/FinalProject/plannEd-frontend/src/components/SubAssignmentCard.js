import React, { Component } from 'react';

export default class SubAssignmentCard extends Component {

  componentDidMount() {
    this.props.assignment.hasSubAssignments ? this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId) : null;
  };

  rener() {
    return (
      <div>
        <h2>{this.props.assignment.title}</h2>
        <p>{this.props.assignment.dueDate}</p>
        <p>{this.props.assignment.description}</p>
        {this.props.assignment.hasSubAssignments
          ?
            <button onClick={this.handleSubAssignments}>See Sub-Assignments</button>
          :
            <button onClick={this.handleComplete}>{this.props.assignment.completed ? "Completed!" : "Complete"}</button>
        }
      </div>
    );
  };
};
