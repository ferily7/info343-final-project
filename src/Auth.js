import React, { Component } from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: ''
        };
    }
    handleSignUp(email, password, username) {

        /* Create a new user and save their information */
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(firebaseUser => {
                console.log('set username', username)
                //include information (for app-level content)
                let profilePromise = firebaseUser.updateProfile({
                    displayName: username,
                }); //return promise for chaining

                return profilePromise;
            })
            .then(firebaseUser => {
                console.log('handle sign up', firebase.auth().currentUser, this)
                this.setState({
                    user: firebase.auth().currentUser
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({ errorMessage: err.message })
            })
    }
    handleSignIn(email, password) {
        //A callback function for logging in existing users


        /* Sign in the user */
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((err) => {
                console.log(err)
                this.setState({ errorMessage: err.message })
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
            <div className="container">
                {['email', 'password', 'username'].map((d) => {
                    return <input
                        name={d}
                        className="validate"
                        placeholder={d}
                        type={d === 'username' ? 'text' : d}
                        onChange={(event) => { this.handleChange(event) }}
                    />
                })

                }

                <div className="form-group">
                    <RaisedButton primary={true} onClick={() => this.handleSignUp(this.state.email, this.state.password, this.state.username)}>
                        Sign Up
                     </RaisedButton>
                    {'  '}
                    <RaisedButton primary={true} onClick={() => this.handleSignIn(this.state.email, this.state.password)}>
                        Sign In
                    </RaisedButton>
                </div>
            </div>
        );
    }
}

export default Auth;