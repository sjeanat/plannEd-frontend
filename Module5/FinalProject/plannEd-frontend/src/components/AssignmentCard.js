import React, { Component } from 'react';
import SubAssignmentCard from './SubAssignmentCard';

export default class AssignmentCard extends Component {

  handleComplete = () => {
    this.props.onCompleteAssignment(this.props.assignment.studentAssignmentId);
  };

  handleSelectAssignment = () => {
    this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId, true)
  };

  handleDeselectAssignment = () => {
    this.props.onDeselectAssignment();
  };

  addSubAssignments = (newSubs, parentId) => {

  };

  showSubAssignments = () => {
    const arr = this.props.selectedAssignment.subAssignments.map((subAss, idx) => {
      return <SubAssignmentCard key={idx} onCompleteSubAssignment={this.props.onCompleteSubAssignment} selectedAssignment={this.props.selectedAssignment} assignment={subAss.assignment} parentId={subAss.parentId} onFetchSubAssignments={this.props.onFetchSubAssignments} onDeselectSubAssignment={this.props.onDeselectSubAssignment}/>
    })
    return arr;
    // console.log("first sub assignments props.assignment:", this.props.assignment) //LEFT OFF HERE!!
    // let obj;
    // let arr;
    // this.props.assignment.subAssignments.forEach(subAss => {
    //   obj = { id: subAss.studentAssignmentId, assignment: subAss, parentId: subAss.parentStudentAssignmentId }
    //   this.subAssignmentsArr.push(obj);
    // });
    // arr = this.subAssignmentsArr.map((subAss, idx) => {
    //   console.log("sub assmignment showFirstAssignments map")
    //   return
    // });
    // return arr;
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

              <p>{this.props.assignment.completed ? "Completed!" : "Incomplete. Finish Sub-Assignments"}</p>
              {(this.props.selectedAssignment.id.length > 0 && this.props.selectedAssignment.id[0][0] === this.props.assignment.studentAssignmentId)
                ?
                  <div>
                    <button onClick={this.handleDeselectAssignment}>Hide Sub-Assignments</button>
                    {this.showSubAssignments()}
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
