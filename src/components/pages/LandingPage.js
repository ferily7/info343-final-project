import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from "../../Auth";

class LandingPage extends Component {
    render() {
        return (
            <div>
                {console.log("landingpage", this.props.firebaseUser)}
                {
                    this.props.firebaseUser !== null &&
                    <Redirect to="/userhome/overview" />
                }
                <Auth />
            </div>
        )
    }
}

export default LandingPage;