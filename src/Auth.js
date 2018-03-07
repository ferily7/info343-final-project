/* Handles Sign Up ONLY */

import React, { Component } from "react";
import firebase from "firebase";
import { Grid, Row, Col } from "react-flexbox-grid";
// material ui components
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: ""
    };
  }
  handleSignUp(email, password, username) {
    /* Create a new user and save their information */
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(firebaseUser => {
        console.log("set username", username);
        let profilePromise = firebaseUser.updateProfile({
          displayName: username
        });

        return profilePromise;
      })
      .then(firebaseUser => {
        console.log("handle sign up", firebase.auth().currentUser, this);
        this.setState({
          user: firebase.auth().currentUser
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ errorMessage: err.message });
      });
  }

  handleChange(event) {
    let value = event.target.value;
    let field = event.target.name;
    let changes = {};
    changes[field] = value;
    this.setState(changes);
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col mdOffset={1} xs={12} md={10}>
          <h1 id="signup-header"> Sign up. It's free.</h1>
          <p className="highlight">{this.state.errorMessage}</p>
        {["email", "password", "username"].map(d => {
          return (
            <TextField
            className="auth-input"
              name={d}
              hintText={d}
              floatingLabelText={d}
              type={d === "username" ? "text" : d}
              fullWidth={true}
              onChange={event => {
                this.handleChange(event);
              }}
            />
          );
        })}

        <div className="form-group">
          <div>
            <RaisedButton
            className="auth-button"
              primary={true}
              onClick={() =>
                this.handleSignUp(
                  this.state.email,
                  this.state.password,
                  this.state.username
                )
              }
              label="Register"
            />
          </div>
        </div>
        </Col>
        </Row>
      </Grid>
    );
  }
}

export default Auth;
