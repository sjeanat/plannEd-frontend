import React, { Component } from 'react';
import SubAssignmentCard from './SubAssignmentCard';

export default class AssignmentCard extends Component {

  componentDidMount() {
    this.props.assignment.hasSubAssignments ? this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId) : null;
  };

  handleComplete = () => {
    this.props.onCompleteAssignment(this.props.assignment.studentAssignmentId);
  };

  handleSelectAssignment = () => {
    this.props.onSelectAssignment(this.props.assignment.studentAssignmentId);
    this.showFirstSubAssignments();
  };

  handleDeselectAssignment = () => {
    this.props.onDeselectAssignment();
  };

  addSubAssignments = () => {

  };

  showSubAssignments = () => {
    console.log("show sub assignments")
  };

  showFirstSubAssignments = () => {
    console.log("first sub assignments", this.props.assignment)
  };

  render() {
    return (
      <div>
        <h2>{this.props.assignment.title}</h2>
        <p>{this.props.assignment.dueDate}</p>
        <p>{this.props.assignment.description}</p>
        {this.props.assignment.hasSubAssignments
          ?
            <div>
              {(this.props.selectedAssignment && this.props.selectedAssignment.id === this.props.assignment.studentAssignmentId)
                ?
                  <div>
                    <button onClick={this.handleDeselectAssignment}>Hide Sub-Assignments</button>
                    {this.props.selectedAssignment.firstChild
                      ?
                        <div>
                          {this.showFirstSubAssignments()}
                        </div>
                      :
                        <div>
                          {this.showSubAssignments()}
                        </div>
                    }
                  </div>
                :
                  <button onClick={this.handleSelectAssignment}>See Sub-Assignments</button>
              }

            </div>
          :
            <button onClick={this.handleComplete}>{this.props.assignment.completed ? "Completed!" : "Complete"}</button>
        }
      </div>
    );
  };
};
//WILL NEED TO DISPLAY COMPLETE IF HAS SUB ASSIGNMENTS & ALL Complete
  //might need to create another attribute when retrieving from backend
