import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeAssignmentsDisplay, sortBy, sortDirection, limitChange, filterByCourse, filterByCompleted, removeCompletedFilter, filterByIncomplete } from '../actions/students';

class AssignmentSearchForm extends Component {

  componentDidMount() {
    this.props.onChangeAssignmentsDisplay();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onChangeAssignmentsDisplay();
  };

  handleCourseChange = (event) => {
    this.props.onFilterByCourse(event.target.value);
  };

  handleSortChange = (event) => {
    this.props.onSortBy(event.target.value);
  };

  handleSortDirection = (event) => {
    console.log("sort direction change:", event.target.value)
    this.props.onSortDirection(event.target.value);
  };

  handleLimitChange = (event) => {
    console.log("limit change:", event.target.value)
    this.props.onLimitChange(event.target.value);
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
          Sort By:
          <select onChange={this.handleSortChange}>
            <option value="Due Date">Due Date</option>
          </select>
          Asc:
          <input onClick={this.handleSortDirection} type="radio" name="sort" value="Ascending"/>
          Desc:
          <input onClick={this.handleSortDirection} type="radio" name="sort" value="Descending"/>
          Days Limit:
          <input type="number" onChange={this.handleLimitChange}/>
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
    },
    onSortBy: (attribute) => {
      dispatch(sortBy(attribute));
    },
    onSortDirection: (direction) => {
      dispatch(sortDirection(direction));
    },
    onLimitChange: (limit) => {
      dispatch(limitChange(limit));
    }
  }
};

export default connect(null, mapDispatchToProps)(AssignmentSearchForm);
