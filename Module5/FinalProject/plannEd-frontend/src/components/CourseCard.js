import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCourse, selectDirectoryCourse, selectDirectoryCourseComponent } from '../actions/students';
import CourseDetails from './CourseDetails';

class CourseCard extends Component {

  handleAddCourse = (event) => {
    const studentCourse = this.studentCourseCreator();
    const instructors = this.props.selectedCourse.selectedLEC.meetings[0].instructors; //pull out intstructors
    this.props.onAddCourse(this.props.student, studentCourse, instructors)
  };

  studentCourseCreator = () => {
    const studentCourse = { //complete this!
      crseId: this.props.selectedCourse.data.crseId,
      subject: this.props.selectedCourse.data.subject,
      catalogNbr: this.props.selectedCourse.data.catalogNbr,
      title: this.props.selectedCourse.data.titleLong,
      description: this.props.selectedCourse.data.description,
      unitsMinimum: this.props.selectedCourse.data.enrollGroups[0].unitsMinimum,
      unitsMaximum: this.props.selectedCourse.data.enrollGroups[0].unitsMaximum,
      sessionBeginDt: this.props.selectedCourse.data.enrollGroups[0].sessionBeginDt,
      sessionEndDt: this.props.selectedCourse.data.enrollGroups[0].sessionEndDt,
      section: this.props.selectedCourse.selectedLEC.section,
      timeStart: this.props.selectedCourse.selectedLEC.meetings[0].timeStart,
      timeEnd: this.props.selectedCourse.selectedLEC.meetings[0].timeEnd,
      pattern: this.props.selectedCourse.selectedLEC.meetings[0].pattern,
      facilityDescr: this.props.selectedCourse.selectedLEC.meetings[0].facilityDescr,
      facilityDescrShort: this.props.selectedCourse.selectedLEC.meetings[0].facilityDescrshort,
    };
    return studentCourse;
  };

  handleDetails = (event) => {
    this.props.onSelectCourse(this.props.course);
  };

  requiredComponentsSelected = () => {
    //check if there is a selection for each required component
  };

  render() {
    const courseDetails = this.props.course.enrollGroups[0].classSections.map((sect, idx) => {
      return <CourseDetails key={idx} data={sect} onSelectComponent={this.props.onSelectComponent} />
    });

    return (
      <div>
        <h1>{this.props.course.titleLong}</h1>
        <p>{this.props.course.description}</p>
        <button onClick={this.handleDetails}>See Details</button>
        {this.props.selectedCourse.data.crseId === this.props.course.crseId
          ?
            <div>
              {courseDetails}
            </div>
          :
            null
        }
        {/*this.requiredComponentsSelected()
          ?
            <p>Please select one of each required component</p>

            TODO actually implement this logic later

          :
          <button onClick=>Add Course</button>
        */}
        <button onClick={this.handleAddCourse}>Add Course</button>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    student: state.student,
    selectedCourse: state.selectedCourse
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddCourse: (student, studentCourse, instructors) => {
      dispatch(addCourse(student, studentCourse, instructors));
    },
    onSelectCourse: (course) => {
      dispatch(selectDirectoryCourse(course));
    },
    onSelectComponent: (type, component) => {
      dispatch(selectDirectoryCourseComponent(type, component));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseCard);
