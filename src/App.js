import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import firebase from "firebase";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {fade} from 'material-ui/utils/colorManipulator';
import "./assets/index.css";

import Header from "./components/header-component/header";
import Login from "./components/pages/login";
import LandingPage from "./components/pages/LandingPage";
import UserHome from "./components/pages/UserHome";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#f75830',
        accent1Color: '#9E9E9E',
        borderColor: '#9E9E9E',
        disabledColor: fade('#000000', 0.5)
    },
    appBar: {
        height: 56
    }
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrip: "", // Keep track of selected trip for rendering pages
            firebaseUser: null // Keep track of firebase user
        };
        this.changeSelectedTrip = this.changeSelectedTrip.bind(this);
    }

    // Keep track of authentication state, to see if user is logged in
    componentDidMount() {
        this.stopWatchingAuth = firebase.auth().onAuthStateChanged(firebaseUser => {
            firebaseUser
                ? this.setState({ firebaseUser: firebaseUser })
                : this.setState({ firebaseUser: null });
        });
    }

    // Stop watching authentication if app unmounts
    componentWillUnmount() {
        this.stopWatchingAuth();
    }

    // changeSelectedTrip will change the selected trip
    // To be used with the sidebar when clicking on a different trip
    // @param   trip    trip is a type string, expected ID of the trip (array key in firebase)
    changeSelectedTrip(trip) {
        this.setState({ selectedTrip: trip });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router>
                    <div className="app">
                        {/* <Header />
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/dashboard" component={Dashboard} /> */}

                        {/* William Kwok's temporary code edits start down here, uncomment the above and comment below if other things need to be tested.
                        Currently will cause compilation errors because of nonexistant objects*/}
                        <Header user={this.state.firebaseUser} />
                        <Route
                            exact
                            path="/"
                            render={routerProps => (
                                <LandingPage
                                    {...routerProps}
                                    firebaseUser={this.state.firebaseUser}
                                />
                            )}
                        />
                        <Route
                            path="/userhome"
                            render={routerProps => (
                                <UserHome
                                    firebaseUser={this.state.firebaseUser}
                                    selectedTrip={this.state.selectedTrip}
                                    changeSelectedTrip={this.changeSelectedTrip}
                                />
                            )}
                        />
                        <Route
                            path="/login"
                            render={routerProps => <Login firebaseUser={this.state.firebaseUser} />}
                        />
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
