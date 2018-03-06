import React, { Component } from 'react';
import firebase from "firebase";

class Sidebar extends Component {
    handleSignOut() {
        this.setState({ errorMessage: null });
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
                <button type="button" onClick={() => this.handleSignOut()}>Log Out</button>
                Sidebar here
            </div>
        )
    }
}

export default Sidebar;