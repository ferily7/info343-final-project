import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import firebase from 'firebase';
import "./assets/index.css";

import Header from "./components/header-component/header";
import Homepage from "./components/pages/homepage";
import Dashboard from "./components/pages/dashboard";
import LandingPage from "./components/pages/LandingPage";
import UserHome from "./components/pages/UserHome";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrip: '',                   // Keep track of selected trip for rendering pages
            firebaseUser: null                  // Keep track of firebase user
        }
        this.changeSelectedTrip = this.changeSelectedTrip.bind(this);
    }

    // Keep track of authentication state, to see if user is logged in
    componentDidMount() {
        this.stopWatchingAuth = firebase.auth().onAuthStateChanged(firebaseUser => {
            firebaseUser ? this.setState({ firebaseUser: firebaseUser }) : this.setState({ firebaseUser: null });
        });
    }

    // Stop watching authentication if app unmounts
    componentWillUnmount() {
        this.stopWatchingAuth();
    }

    // changeSelectedTrip will change the selected trip
    // To be used with the sidebar when clicking on a different trip
    //      This means we pass it down to UserHome then to the Sidebar
    // Prerequisite: trips must have unique names or IDs, it'd be way easier to have them have unique names than IDs, in personal experience
    // @param   trip    trip is a type string, expected either name or ID depending on what we choose
    changeSelectedTrip(trip) {
        this.setState({ selectedTrip: trip });
    }

    render() {
        return (
            <Router>
                <div className="app">
                    {/* <Header />
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/dashboard" component={Dashboard} /> */}

                    {/* William Kwok's temporary code edits start down here, uncomment the above and comment below if other things need to be tested.
                        Currently will cause compilation errors because of nonexistant objects*/}
                    <Route exact path="/" render={(routerProps) => (<LandingPage {...routerProps} firebaseUser={this.state.firebaseUser} />)} />
                    <Route exact path="/userhome" render={(routerProps) => (<UserHome firebaseUser={this.state.firebaseUser}
                        selectedTrip={this.state.selectedTrip}
                        changeSelectedTrip={this.changeSelectedTrip} />)} />

                </div>
            </Router>
        );
    }
}

export default App;
