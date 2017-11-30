import React, { Component } from 'react';

export default class SubAssignmentCard extends Component {

  // componentDidMount() { //NEED TO FIX FETCH SUBASSIGNMENT
  //   // this.props.assignment.hasSubAssignments ? this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId) : null;
  //   if (this.props.assignment.hasSubAssignments) {
  //     console.log("SubAssignmentCard fetch sub assignments");
  //     this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId, true);
  //   };
  // };

  handleSubAssignments = () => {
    this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId);
  };

  handleDeselectSubAssignment = () => {
    this.props.onDeselectSubAssignment(this.props.assignment.studentAssignmentId);
  };

  render() {
    console.log("SubAssignmentCard render")

    const selectedNow = for this.props.selectedAssignment.id
    return (
      <div className="sub-assignment-card">
        <h2>{this.props.assignment.title}</h2>
        <p>{this.props.assignment.dueDate}</p>
        <p>{this.props.assignment.description}</p>
        {this.props.assignment.hasSubAssignments
          ?
            <div>
              {this.props.assignment.selectedNow
                ?
                  <button onClick={this.handleDeselectSubAssignment}>Hide Sub-Assignments</button>
                :
                  <button onClick={this.handleSubAssignments}>See Sub-Assignments</button>
              }
            </div>
          :
            <button onClick={this.handleComplete}>{this.props.assignment.completed ? "Completed!" : "Complete"}</button>
        }
      </div>
    );
  };
};
