import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

// material ui components
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Divider from "material-ui/Divider";

// renders the navbar
class Header extends Component {
  render() {
    return (
      <AppBar
              className="appbar"
              title={<Link className="nav-title" to="/">Title</Link>}
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
        <Link to="/login">
          <FlatButton {...this.props} label="Sign In" />
</Link>
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
      <div>Welcome, {user}</div>
    );
  }
}

export default Header;
