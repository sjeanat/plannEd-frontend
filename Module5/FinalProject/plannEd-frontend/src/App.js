import React, { Component } from 'react';
import './App.css';
import DashboardContainer from './components/DashboardContainer';
import { Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="app-wrapper">
        <Route path="/" component={DashboardContainer} />
      </div>
    );
  }
}

export default App;
