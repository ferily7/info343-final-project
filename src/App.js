import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import "./assets/index.css";

import Header from "./components/header-component/header";
import Homepage from "./components/pages/homepage";
import Dashboard from "./components/pages/dashboard";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
