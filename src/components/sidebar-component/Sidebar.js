import React, { Component } from 'react';
import firebase from "firebase";
import { Redirect } from 'react-router-dom';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ''
        }
    }
    handleSignOut() {
        firebase
            .auth()
            .signOut()
            .catch(err => {
                console.log(err);
                this.setState({ errorMessage: err.message });
            });
    }
    render() {
        return (
            <div>
                {this.props.firebaseUser ? undefined : <Redirect to="/" />}
                <button type="button" onClick={() => this.handleSignOut()}>Log Out</button>
                Sidebar here
            </div>
        )
    }
}

export default Sidebar;