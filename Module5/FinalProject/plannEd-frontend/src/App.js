import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import AssignmentContainer from './containers/AssignmentContainer';
import DirectoryContainer from './containers/DirectoryContainer';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Home from './components/Home';
import NavBar from './components/NavBar';



class App extends Component {

  render() {
    return (
      <div className="app-wrapper">
        <Route path="/" render={props => <NavBar {...props}/>} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/sign-in" render={props => <SignInForm {...props}/>} />
        <Route exact path="/sign-up" render={props => <SignUpForm {...props}/>} />
        <Route exact path="/course-directory" render={props => <DirectoryContainer {...props}/>} />
        <Route exact path="/assignments" render={props => <AssignmentContainer {...props}/>} />
      </div>
    );
  }
}

export default App;
