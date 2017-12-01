import React, { Component } from 'react';

export default class SubAssignmentCard extends Component {

  // componentDidMount() { //NEED TO FIX FETCH SUBASSIGNMENT
  //   // this.props.assignment.hasSubAssignments ? this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId) : null;
  //   if (this.props.assignment.hasSubAssignments) {
  //     console.log("SubAssignmentCard fetch sub assignments");
  //     this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId, true);
  //   };
  // };

  handleComplete = () => {
    const rootAssignmentIds = this.props.studentAssignments.data.map(ass => ass.studentAssignmentId); //missing StudentAssignment.data
    const subAssignmentIds = this.props.selectedAssignment.subAssignments.map(subAss => subAss.id);
    console.log("root ids", rootAssignmentIds, "sub ids", subAssignmentIds)
    this.props.onCompleteSubAssignment(this.props.assignment.studentAssignmentId, rootAssignmentIds, subAssignmentIds);
  };

  handleSubAssignments = () => {
    this.props.onFetchSubAssignments(this.props.assignment.studentAssignmentId);
    //dont forget to edit FetchSubAssignments reducer case s.t. it formats selectedAssignment.id properly
  };

  handleDeselectSubAssignment = () => {
    this.props.onDeselectSubAssignment(this.props.assignment.studentAssignmentId);
  };

  // areChildrenVisible = (haystack, arr) => {
  //   return arr.some(function (v) {
  //       return haystack.indexOf(v) >= 0;
  //   })
  // };

  render() {
    // let selectedIds = [];
    // this.props.selectedAssignment.id.forEach(idSet => {
    //   selectedIds = [...selectedIds, ...idSet]
    // });
    // let childrenIds = [];
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
              <p>{this.props.assignment.completed ? "Completed!" : "Incomplete. Finish Sub-Assignments"}</p>
              {show
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

// a3a = { subass: [], completed: true }
// a3b = { subass: [], completed: true }
// a3c = { subass: [], completed: true }
// a3 = { subass: [a3a, a3b, a3c], completed: true }
// a2 = { subass: [], completed: true }
// a1 = { subass: [], completed: true }
// c = { subass: [], completed: true }
// b = { subass: [], completed: true }
// a = { subass: [a1, a2, a3], completed: true }
// root = { subass: [a, b, c], completed: false }
// function checkSubAssignmentTree(node, numChildren) {
//   for (let idx = 0; idx < node.subass.length; idx++) {
//     console.log(node);
//     if (!checkSubAssignmentTree(node.subass[idx], 0)) {
//       return false
//     }
//     if ((idx + 1) === numChildren) {
//       return true
//     }
//   }
//   return (!node.completed) ? false : true
// }
//
// checkSubAssignmentTree(root, 3)
