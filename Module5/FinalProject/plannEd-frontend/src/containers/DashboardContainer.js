import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { fetchCourses, signoutUser, updateEmail, signinUser, addStudent, addCourse, completeAssignment, selectCourseAssignments, selectAllAssignments, selectUpcomingAssignments} from '../actions/students';
import { ...studentsAction } from '../actions/students';
import CourseContainer from '../containers/CourseContainer';
import NavBar from '../components/NavBar';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import Home from '../components/Home';

class DashboardContainer extends Component {

  render() {
    return (
      <div className="dashboard-container-wrapper">
        <NavBar studentId={this.props.student.id} studentCourses={this.props.studentCourses} />
        <Route path="/home" component={Home} />
        {id
          ?
            <Route path="/" component={CourseContainer} />
          :
            <Route path="/sign_in" render={(props) => <SignInForm onSignIn={props.signInUser}/>} />
            <Route path="/sign_up" render={(props) => <SignUpForm onSignUp={props.signUpUser}/>} />
        }
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    student: state.student,
    studentCourses: state.studentCourses
  };
};

function mapDispatchToProps(dispatch) {
  return {
    signUpUser: (email, firstName, lastName) => {
      dispatch(signOutUser(email, firstName, lastName));
    },
    signInUser: (email) => {
      dispatch(signInUser(email));
    }
  };
};
  // return {
  //   fetchCourses: () => {
  //     dispatch(fetchCourses());
  //   },
  //   onSignout: () => {
  //     dispatch(signoutUser());
  //   },
  //   onUpdateEmail: text => {
  //     dispatch(updateEmail(text));
  //   },
  //   onSignin: email => {
  //     dispatch(signinUser(email));
  //   },
  //   onAddStudent: email => {
  //     dispatch(addStudent(email));
  //   },
  //   onAddCourse: course_id => {
  //     dispatch(addCourse(course_id));
  //   },
  //   onCompleteAssignment: student_assignment_id => {
  //     dispatch(completeAssignment(student_assignment_id));
  //   },
  //   onSelectCourseAssignments: (student_id, course_id) => {
  //     dispatch(selectCourseAssignments(student_id, course_id))
  //   },
  //   onSelectAllAssignments: student_id => {
  //     dispatch(selectAllAssignments(student_id));
  //   },
  //   onSelectUpcomingAssignments: student_id => {
  //     dispatch(selectUpcomingAssignments(student_id));
  //   }
  // };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
