import React, { Component } from 'react';
import firebase from 'firebase';
import NoTrips from "./NoTrips";

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRef: null
        }
    }
    // Component will receive the correct selected trip, update the reference to the trip when this is done
    componentWillReceiveProps(inProp) {
        this.dataRef = firebase.database().ref(`${inProp.firebaseUser.uid}/trips/${inProp.selectedTrip}`);
        this.dataRef.on('value', (snapshot) => {
            if (this.mounted) {
                this.setState({ dataRef: snapshot.val() });
            }
        })
    }

    // Grab what it can when component mounts, need this for when switching between tabs.
    componentDidMount() {
        this.mounted = true;
        if (this.props.firebaseUser) {
            this.dataRef = firebase.database().ref(`${this.props.firebaseUser.uid}/trips/${this.props.selectedTrip}`);
            this.dataRef.on('value', (snapshot) => {
                if (this.mounted) {
                    this.setState({ dataRef: snapshot.val() });
                }
            })
        }
    }

    // Set unmount state so doesn't update when not mounted anymore
    componentWillUnmount() {
        this.mounted = false;
    }
    render() {
        return (

            <div>
                {this.props.selectedTrip === "" &&
                    <NoTrips />
                }
                {this.props.selectedTrip !== "" && this.state.dataRef &&
                    <div>{this.state.dataRef.tripName}{console.log(this.state.dataRef)}</div>
                }
            </div>


        )
    }
}

export default Reservations;