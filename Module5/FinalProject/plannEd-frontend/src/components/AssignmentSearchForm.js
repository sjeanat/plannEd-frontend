import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeAssignmentsDisplay, sortDirection, limitStartChange, limitEndChange, filterByCourse, filterByCompleted, removeCompletedFilter, filterByIncomplete } from '../actions/students';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './AssignmentSearchForm.css';
import 'react-datepicker/dist/react-datepicker.css';
import $ from 'jquery';

class AssignmentSearchForm extends Component {

  componentDidMount() {
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

  handleLimitStartChange = (event) => {
    console.log("start limit", event._d)
    this.props.onLimitStartChange(event._d)
  };

  handleLimitEndChange = (event) => {
    console.log("end limit", event._d)
    this.props.onLimitEndChange(event._d)
  };


  render() {
    const courseOptions = this.props.courses.map((course, idx) => {
      return <option key={idx} value={course.studentCourseId}>{course.title}</option>
    });
    const aMoment = moment();
    
    return (
      <div className="assignment-form-container">
        <form className="assignment-form">
          {console.log("completefilter", this.props.incompleteFilter)}
          Incomplete: <input onClick={this.handleCompletedFilter} type="radio" name="complete-filter" checked={this.props.incompleteFilter ? "checked" : ""} value="Incomplete"/>
          Completed: <input onClick={this.handleCompletedFilter} type="radio" name="complete-filter" value="Completed"/>
          All: <input onClick={this.handleCompletedFilter} type="radio" name="complete-filter" value="All" />
          Course:
          <select onChange={this.handleCourseChange}>
            <option value="All Courses">All Courses</option>
            {courseOptions}
          </select>
          Asc:
          <input onClick={this.handleSortDirection} type="radio" name="sort" value="Ascending" checked={this.props.ascendingFilter ? "checked" : ""}/>
          Desc:
          <input onClick={this.handleSortDirection} type="radio" name="sort" value="Descending"/>
          Date Range:
          <DatePicker
            className="assignment-search-date-picker"
            selected={this.props.limitStart ? moment(this.props.limitStart) : aMoment}
            onChange={this.handleLimitStartChange}
          />
          <DatePicker
            className="assignment-search-date-picker"
            selected={this.props.limitEnd ? moment(this.props.limitEnd) : aMoment}
            onChange={this.handleLimitEndChange}
          />
        </form>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    incompleteFilter: state.studentAssignments.completedFilter === "Incomplete",
    ascendingFilter: state.studentAssignments.sortDirection === "Ascending",
    limitStart: state.studentAssignments.limitStart,
    limitEnd: state.studentAssignments.limitEnd
  }
}

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
    onSortDirection: (direction) => {
      dispatch(sortDirection(direction));
    },
    onLimitStartChange: (limit) => {
      dispatch(limitStartChange(limit));
    },
    onLimitEndChange: (limit) => {
      dispatch(limitEndChange(limit));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentSearchForm);
