import React, { Component } from 'react';
import CourseCard from './CourseCard';

export default class CourseList extends Component {

  componentDidMount() {
    this.props.fetchCourses();
  };

  handleClick = (event) => {

  };

  render() {
    console.log("courselist props", this.props)
    const courses = this.props.student.id ? this.props.student.allCourses.courses.map((course, idx) => (
      <CourseCard key={idx} student_id={this.props.student.id} course_id={course.id} course={course} onAddCourse={this.props.onAddCourse}/>
    )) : null

    return (
      <div>
        {courses}
      </div>
    );
  };
};
