import React, { Component } from "react";
import { Link } from "react-router-dom";

// renders the navbar
class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Trip Planner
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
