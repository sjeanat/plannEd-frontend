import React, { Component } from 'react';

export default class SubAssignmentCard extends Component {

  handleParentComplete = () => {
    this.props.onCompleteParent(this.props.assignment.studentAssignmentId)
  };

  handleComplete = () => {
    const rootAssignmentIds = this.props.studentAssignments.data.map(ass => ass.studentAssignmentId); //missing StudentAssignment.data
    const subAssignmentIds = this.props.selectedAssignment.subAssignments.map(subAss => subAss.id);
    this.props.onCompleteSubAssignment(this.props.assignment.studentAssignmentId, rootAssignmentIds, subAssignmentIds);
  };

  handleSubAssignments = () => {
    this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId);
    //dont forget to edit FetchSubAssignments reducer case s.t. it formats selectedAssignment.id properly
  };

  handleDeselectSubAssignment = () => {
    this.props.onDeselectSubAssignment(this.props.assignment.studentAssignmentId);
  };

  render() {
    let show = false;
    this.props.selectedAssignment.subAssignments.forEach(subAss => {
      if (subAss.parentId === this.props.assignment.studentAssignmentId) {
        show = true;
      }
    });

    return (
      <div className="sub-assignment-card">
        <h2>{this.props.assignment.title}</h2>
        <p>{this.props.assignment.dueDate}</p>
        <p>{this.props.assignment.description}</p>
        {this.props.assignment.hasSubAssignments
          ?
            <div>
              <button onClick={this.handleParentComplete}>{this.props.assignment.completed ? "Completed!" : "Complete Sub-Assignments"}</button>
              {show
                ?
                  <button onClick={this.handleDeselectSubAssignment}>Hide Sub-Assignments</button>
                :
                  <button onClick={this.handleSubAssignments}>See Sub-Assignments</button>
              }
            </div>
          :
            <div>
              <button onClick={this.handleComplete}>{this.props.assignment.completed ? "Completed!" : "Complete"}</button>
            </div>
        }
      </div>
    );
  };
};
