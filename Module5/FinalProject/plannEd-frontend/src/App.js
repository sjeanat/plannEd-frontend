import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import DirectoryContainer from './containers/DirectoryContainer';
import DashboardContainer from './containers/DashboardContainer';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Home from './components/Home';
// import NavBar from './components/NavBar';


// <Route path="/" render={props => <NavBar {...props}/>} />
// <Route exact path="/" component={Home} />

class App extends Component {

  render() {
    return (
      <div className="app-wrapper">
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" render={props => <SignInForm {...props}/>} />
        <Route exact path="/sign-up" render={props => <SignUpForm {...props}/>} />
        <Route exact path="/dashboard" render={props => <DashboardContainer {...props}/>} />
        <Route exact path="/course-directory" render={props => <DirectoryContainer {...props}/>} />
      </div>
    );
  }
}

export default App;
