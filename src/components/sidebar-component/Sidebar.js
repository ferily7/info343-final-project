import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

// material ui components
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui/List";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            orgReference: null
        };
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
    componentDidMount() {
        this.mounted = true;
        if (this.props.firebaseUser) {
            this.orgReference = firebase.database().ref(`${this.props.firebaseUser.uid}/trips`);
            console.log(this.orgReference);
            this.orgReference.on('value', (snapshot) => {
                if (this.mounted) {
                    this.setState({ orgReference: snapshot.val() });
                }
            })
        }
    }
    render() {
        return (
            <div>
                {this.props.firebaseUser ? undefined : <Redirect to="/" />}
                <div className="sidebar">
                    <List className="trip-list">
                        {
                            this.state.orgReference &&
                            Object.keys(this.state.orgReference).map((d) => {
                                return <ListItem className="trip-list-item"
                                    key={d}
                                    primaryText={this.state.orgReference[d].tripName}
                                    onClick={() => this.props.changeSelectedTrip(this.state.orgReference[d].tripName)} />
                            })
                        }
                        {/* <ListItem className="trip-list-item" primaryText="Trip 1" />
                        <ListItem className="trip-list-item" primaryText="Trip 2" />
                        <ListItem className="trip-list-item" primaryText="Trip 3" />
                        <ListItem className="trip-list-item" primaryText="Trip 4" /> */}
                        <ListItem
                            id="new-trip"
                            className="trip-list-item"
                            primaryText="+ New"
                        />
                    </List>

                    <RaisedButton
                        className="signout-button"
                        label="Sign Out"
                        primary={true}
                        onClick={() => this.handleSignOut()}
                    />
                </div>
            </div>
        );
    }
}

export default Sidebar;
