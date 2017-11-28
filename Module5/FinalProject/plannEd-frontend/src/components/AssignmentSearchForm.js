import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeAssignmentsDisplay, sortByDueDate, sortReverse, filterByCourse, filterByCompleted, removeCompletedFilter, filterByIncomplete, filterByDueDate } from '../actions/students';

class AssignmentSearchForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit", this.props.assignments)
    this.props.onChangeAssignmentsDisplay();
  };

  handleCourseChange = (event) => {
    this.props.onFilterByCourse(event.target.value);
  };

  handleCompletedFilter = (event) => {
    switch (event.target.value) {
      case "All":
        return this.props.onRemoveCompletedFilter();
      case "Incomplete":
        return this.props.onFilterByIncomplete();
      case "Completed":
        return this.props.onFilterByCompleted();
      default: break;
    };
  };

  render() {
    const courseOptions = this.props.courses.map((course, idx) => {
      return <option key={idx} value={course.studentCourseId}>{course.title}</option>
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Incomplete: <input onClick={this.handleCompletedFilter} type="radio" name="complete-filter" value="Incomplete"/>
          Completed: <input onClick={this.handleCompletedFilter} type="radio" name="complete-filter" value="Completed"/>
          All: <input onClick={this.handleCompletedFilter} type="radio" name="complete-filter" value="All" />
          Course:
          <select onChange={this.handleCourseChange}>
            <option value="All Courses">All Courses</option>
            {courseOptions}
          </select>
          <input type="submit" value="Search"/>
        </form>
      </div>
    );
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onFilterByCourse: (studentCourseId) => {
      dispatch(filterByCourse(studentCourseId));
    },
    onFilterByCompleted: () => {
      dispatch(filterByCompleted());
    },
    onFilterByIncomplete: () => {
      dispatch(filterByIncomplete());
    },
    onRemoveCompletedFilter: () => {
      dispatch(removeCompletedFilter());
    },
    onChangeAssignmentsDisplay: () => {
      dispatch(changeAssignmentsDisplay());
    }
  }
};

export default connect(null, mapDispatchToProps)(AssignmentSearchForm);
