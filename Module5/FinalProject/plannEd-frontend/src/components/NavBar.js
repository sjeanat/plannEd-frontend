import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends Component {

  render() {
    const signed_in_links = this.props.studentCourses.map(studentCourse => {
        return (<li className="navlink normal" activeClassName="navlink active"><NavLink to="/{studentCourse.title.split(" ").join("_")}" exact>{studentCourse.title}</NavLink></li>);
      });
    };

    return (
      <div className="navbar-wrapper">
        <ul className="navlinks-wrapper">
          <li className="navlink normal" activeClassName="navlink active"><NavLink to="/home" exact>Home</NavLink></li>
          {this.props.studentId
            ?
              signed_in_links
            :
              <li className="navlink normal" activeClassName="navlink active"><NavLink to="/sign_in" exact>Sign In</NavLink></li>
              <li className="navlink normal" activeClassName="navlink active"><NavLink to="/sign_up" exact>Sign Up</NavLink></li>
          }
        </ul>
      </div>
    );
  };
};
