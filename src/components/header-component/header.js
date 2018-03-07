import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

// material ui components
import AppBar from "material-ui/AppBar";

// renders the navbar
class Header extends Component {
    render() {
        return (
            <AppBar
                className="appbar"
                title={
                    <Link className="nav-title" to="/">
                        Trip Planner
          </Link>
                }
                showMenuIconButton={false}
                iconElementRight={
                    // determine which menu to display
                    this.props.user ? <Logged /> : <SignIn />
                }
            />
        );
    }
}

class SignIn extends Component {
    static muiName = "FlatButton";
    render() {
        return (
            <div>
                {/* seems redundant to have two login buttons
        <Link to="/login">
          <FlatButton {...this.props} label="Sign In" />
        </Link>
        */}
            </div>
        );
    }
}

// if the user is signed in, the navigation menu to different chat rooms and
// the dashboard are displayed. The user can log out at any time.
class Logged extends Component {
    render() {
        const user = firebase.auth().currentUser.displayName;
        return (
            <div className="signed-in">
                Welcome, <span className="highlight">{user}</span>.
      </div>
        );
    }
}

export default Header;
