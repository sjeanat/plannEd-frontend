import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AssignmentList from '../components/AssignmentList';
import CourseList from '../components/CourseList';

export default class CourseContainer extends Component {

  render() {
    return (
      <div className="course-container-wrapper">
        <h1>Course Container</h1>
      </div>
    );
  };
};
