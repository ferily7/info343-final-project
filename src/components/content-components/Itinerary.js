import React, { Component } from 'react';
import firebase from 'firebase';

class Itinerary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRef: null,
            cost: 0,
            eventEnd: 0,
            eventStart: 0,
            eventName: '',
            location: '',
            reservation: null,
            type: '',
            errorMessage: ''
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

    // Load calendar based on existing events from state
    // Click events for updating calendar events
    // Add event to database based on inputs
    addEvent() {
        if (this.state.eventEnd === 0 || this.state.eventStart === 0) {
            this.setState({ errorMessage: "Event dates unspecified" });
        } else if (this.state.type === '') {
            this.setState({ errorMessage: "Event type not specified" });
        } else if (this.state.eventName === '') {
            this.setState({ errorMessage: "Event unnamed" });
        } else {
            let newEvent = {
                cost: this.state.cost,
                eventEnd: this.state.eventEnd,
                eventStart: this.state.eventStart,
                eventName: this.state.eventName,
                location: this.state.location,
                reservation: this.state.reservation,
                type: this.state.type
            }
            this.dataRef.child("events").push(newEvent);
            this.setState({
                cost: 0,
                eventEnd: 0,
                eventStart: 0,
                eventName: '',
                location: '',
                reservation: null,
                type: '',
                errorMessage: ''
            });
        }
    }



    render() {
        return (

            <div>
                {this.props.selectedTrip === "" &&
                    <div>
                        Select a trip to begin
                    </div>
                }
                {this.props.selectedTrip !== "" && this.state.dataRef &&
                    <div>{this.state.dataRef.tripName}{console.log(this.state.dataRef)}</div>
                }
            </div>


        )
    }
}

export default Itinerary;