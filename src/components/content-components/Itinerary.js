import React, { Component } from 'react';
import firebase from 'firebase';
import NoTrips from "./NoTrips";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

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
            reservation: false,
            type: '',
            errorMessage: ''
        }
    }

    // Component will receive the correct selected trip, update the reference to the trip when this is done
    componentWillReceiveProps(inProp) {
        if (inProp.firebaseUser) {
            this.dataRef = firebase.database().ref(`${inProp.firebaseUser.uid}/trips/${inProp.selectedTrip}`);
            this.dataRef.on('value', (snapshot) => {
                if (this.mounted) {
                    this.setState({ dataRef: snapshot.val() });
                }
            })
        }
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

    // handleChange to change the event state based on a string, taken from class example
    handleChange(event) {
        let value = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = value;
        this.setState(change);
    }

    // addEvent adds an event to the user's event list in the database, if
    // requirements are met. Multiple events can have the same event name!
    // prerequisites:
    //      this.state.eventEnd and this.state.eventStart must be valid (not 0)
    //      this.state.type cannot be an empty string
    //      this.state.eventName cannot be a empty string
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
                reservation: false,
                type: '',
                errorMessage: ''
            });
        }
    }

    testSetState() {
        this.setState({
            cost: 19999,
            eventEnd: 92183,
            eventStart: 991723281,
            eventName: 'Test!',
            location: 'seattle',
            reservation: true,
            type: 'Dinner'
        })
    }

    render() {
        console.log(this.state.dataRef);
        return (
            <div>
                {this.props.selectedTrip === "" &&
                    <NoTrips />
                }
                {this.state.errorMessage &&
                    <div><p className="alert alert-danger">{this.state.errorMessage}</p></div>
                }
                {this.props.selectedTrip !== "" && this.state.dataRef &&
                    <div>
                        <BigCalendar
                            selectable
                            events={this.state.dataRef.events ? Object.keys(this.state.dataRef.events).map((d, i) => {
                                let returnObj = {
                                    id: 0,
                                    name: d,
                                    title: this.state.dataRef.events[d].eventName,
                                    start: new Date(this.state.dataRef.events[d].eventStart),
                                    end: new Date(this.state.dataRef.events[d].eventEnd)
                                }
                                return returnObj;
                            }) : []}
                            defaultView="week"
                            scrollToTime={new Date(1970, 1, 1, 6)}
                            defaultDate={new Date(this.state.dataRef.dateStart)}
                            onSelectEvent={event => alert(event.title)}
                            onSelectSlot={slotInfo =>
                                alert(
                                    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                                    `\nend: ${slotInfo.end.toLocaleString()}` +
                                    `\naction: ${slotInfo.action}`
                                )
                            }

                        />
                        {this.state.dataRef.tripName}{console.log(this.state.dataRef)}
                        <button className="btn btn-success mr-2" onClick={() => this.testSetState()}>
                            testSetState
                        </button>
                        <button className="btn btn-success mr-2" onClick={() => this.addEvent()}>
                            add event
                        </button>
                    </div>
                }

                {/* {
                    new Date(2015, 3, 1).getTime()
                } */}
            </div>


        )
    }
}

export default Itinerary;