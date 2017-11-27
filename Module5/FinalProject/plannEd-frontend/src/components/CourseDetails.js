import React, { Component } from 'react';

class CourseDetails extends Component {

  handleSelectComponent = () => {
    this.props.onSelectComponent("LEC", this.props.data)
  };

  render() {
    const instructors = this.props.data.meetings[0].instructors.map((inst, idx) => {
      return <p key={idx}>{inst.firstName + " " + inst.lastName + ", " + inst.netid + "@cornell.edu"}</p>
    })
    return(
      <div>
        <h3>{this.props.data.ssrComponent + " Section: " + this.props.data.section}</h3>
          <p>{this.props.data.meetings[0].pattern + ":" + this.props.data.meetings[0].timeStart + "-" + this.props.data.meetings[0].timeEnd}</p>
          <p>{this.props.data.meetings[0].facilityDescrshort}</p>
        <h4>Instructors:</h4>
          {instructors}
        <button onClick={this.handleSelectComponent}>Add Component</button>
      </div>
    )
  }
};

export default CourseDetails;

//not accounting for different meetings
