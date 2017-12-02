import React, { Component } from 'react';
import { Redirect } from 'react-router';
import DashboardAssignment from './DashboardAssignment';

class DashboardList extends Component {

  componentDidMount() {
    console.log("DashboardList CDM", this.props.studentId, this.props.limit)
    this.props.onFetchUpcomingAssigments(this.props.studentId, this.props.limit);
  };

  render() {
    console.log(this.props.studentId, this.props.assignments)
    const assignments = this.props.studentId ? this.props.assignments.map((assignment,idx) => {
      return <DashboardAssignment key={idx} assignment={assignment}/>
    }) : [];

    return (
      <div>
        {assignments}
      </div>
    );
  };
};

export default DashboardList;
