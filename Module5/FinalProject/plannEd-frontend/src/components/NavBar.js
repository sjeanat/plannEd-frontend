import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOutUser } from '../actions/students';

// Components
import AssignmentContainer from '../containers/AssignmentContainer';

// Helpers
import generatKeyFrames from './helpers/generateKeyFrames';

// Styles
import './NavBar.css';

let prevTab = '';

const tabPositions = {
  dashboard: 0,
  directory: 70,
  signout: 140,
  home: -100,
  signin: 70,
  signup: 0
};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.setPrevTab = this.setPrevTab.bind(this);
  }

  getActiveTabStyle = () => {
    const { activeTab } = this.props;
    if (prevTab) {
      generatKeyFrames(tabPositions[prevTab], tabPositions[activeTab]);

      return {
        WebkitAnimation: 'slide-tab 0.8s',
        animation: 'slide-tab 0.8s',
        animationFillMode: 'forwards'
      };
    } else {
      return { top: `${tabPositions[activeTab] + 70}px` };
    }
  }

  handleSignOut = () => {
    this.props.onSignOut();
  };

  setPrevTab = () => {
    prevTab = this.props.activeTab;
  };

  render() {
    const { activeTab } = this.props;
    const isAssignmentsTab = activeTab === 'assignments';
    const assignmentsActiveClass = isAssignmentsTab ? 'active' : '';
    const directoryActiveClass = activeTab === 'directory' ? 'active' : '';
    const signinActiveClass = activeTab === 'signin' ? 'active' : '';
    const signupActiveClass = activeTab === 'signup' ? 'active' : '';
    let activeTabStyle = this.getActiveTabStyle();

    return (
      <div className="navbar-wrapper">
        <span style={activeTabStyle} className="active-tab">
          <span className="after-first"></span>
          <span className="after-second"></span>
        </span>
        <ul className="navlinks-wrapper">
          <li className="navlink">
            <NavLink className="link home" to="/" exact>
              <div className="logo">
                <img className="logo-img" src="../cornell.png"></img>
              </div>
            </NavLink>
          </li>
          {this.props.studentId
            ?
              <div>
                <li onClick={this.setPrevTab} className="navlink" ><NavLink activeClassName="active" className="link" to="/dashboard" exact>Dashboard</NavLink></li>
                <li onClick={this.setPrevTab} className="navlink" ><NavLink activeClassName="active" className="link" to="/course-directory" exact>Course Directory</NavLink></li>
                <li onClick={this.setPrevTab} className="navlink" onClick={this.handleSignOut}><NavLink className="link sign-out" to="/" exact>Sign Out</NavLink></li>
              </div>
            :
            <div>
              <li onClick={this.setPrevTab} className={`navlink ${signupActiveClass}`}><NavLink activeClassName="active" className="link" to="/sign-up" exact>Sign Up</NavLink></li>
              <li onClick={this.setPrevTab} className={`navlink ${signinActiveClass}`}><NavLink activeClassName="active" className="link sign-in" to="/sign-in" exact>Sign In</NavLink></li>
            </div>
          }
        </ul>
        {isAssignmentsTab &&
          <div className="nav-assignments">
            <AssignmentContainer />
          </div>
        }
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
