import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/students';

class NavBar extends Component {

  handleSignOut = () => {
    this.props.onSignOut();
  };

  render() {
    return (
      <div className="navbar-wrapper">
        <ul className="navlinks-wrapper">
          <li className="navlink"><NavLink to="/home" exact>Home</NavLink></li>
          {this.props.studentId
            ?
              <div>
                <li className="navlink" ><NavLink to="/assignments" exact>Assignments</NavLink></li>
                <li className="navlink" ><NavLink to="/course-directory" exact>Course Directory</NavLink></li>
                <li className="navlink" onClick={this.handleSignOut}><NavLink to="/home" exact>Sign Out</NavLink></li>
              </div>
            :
            <div>
              <li className="navlink"><NavLink to="/sign-up" exact>Sign Up</NavLink></li>
              <li className="navlink"><NavLink to="/sign-in" exact>Sign In</NavLink></li>
            </div>
          }
        </ul>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    studentId: state.student.id,
    studentCourses: state.studentCourses
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onSignOut: () => {
      dispatch(signOutUser());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
