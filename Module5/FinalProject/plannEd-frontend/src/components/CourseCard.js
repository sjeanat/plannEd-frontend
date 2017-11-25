import React, { Component } from 'react';

export default class CourseCard extends Component {

  handleClick = (event) => {
    console.log("coursecard, course id:", this.props.course_id)
    this.props.onAddCourse({
      student_id: this.props.student_id,
      course_id: this.props.course_id
    })
  };

  render() {
    return (
      <div>
        <h1>{this.props.course.title}</h1>
        <p>{this.props.course.description}</p>
        <button onClick={this.handleClick}>Add Course</button>
      </div>
    );
  }
};
