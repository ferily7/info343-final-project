import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignUp from "../../Auth";
//import "../../assets/landing.css";

class LandingPage extends Component {
    render() {
        return (
            <div>
                {console.log("landingpage", this.props.firebaseUser)}
                {
                    this.props.firebaseUser !== null &&
                    <Redirect to="/userhome/overview" />
                }
                
                <SignUp />
            </div>
        )
    }
}

export default LandingPage;