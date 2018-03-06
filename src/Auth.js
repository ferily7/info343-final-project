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
        //include information (for app-level content)
        let profilePromise = firebaseUser.updateProfile({
          displayName: username
        }); //return promise for chaining

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
    let changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col mdOffset={1} xs={12} md={10}>
        {["email", "password", "username"].map(d => {
          return (
            <TextField
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
