import React, { Component } from "react";
import firebase from "firebase";
import { Grid, Row, Col } from "react-flexbox-grid";
import NoTrips from "./NoTrips";
import _ from "lodash";
// material ui components
import {
    Card,
    CardHeader,
    CardMedia,
    CardText
} from "material-ui/Card";

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRef: null,
            addRequest: false,
            reservations: 0
        };
    }
    // Component will receive the correct selected trip, update the reference to the trip when this is done
    componentWillReceiveProps(inProp) {
        if (inProp.firebaseUser) {
            this.dataRef = firebase
                .database()
                .ref(`${inProp.firebaseUser.uid}/trips/${inProp.selectedTrip}`);
            this.dataRef.on("value", snapshot => {
                if (this.mounted) {
                    this.setState({ dataRef: snapshot.val() });
                }
            });
        }
    }

    // Grab what it can when component mounts, need this for when switching between tabs.
    componentDidMount() {
        this.mounted = true;
        if (this.props.firebaseUser) {
            this.dataRef = firebase
                .database()
                .ref(`${this.props.firebaseUser.uid}/trips/${this.props.selectedTrip}`);
            this.dataRef.on("value", snapshot => {
                if (this.mounted && this.props.selectedTrip !== "") {
                    this.setState({ dataRef: snapshot.val()[this.props.selectedTrip] ? snapshot.val()[this.props.selectedTrip] : snapshot.val() });
                }
            });
        }
    }

    // Set unmount state so doesn't update when not mounted anymore
    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const events = this.state.dataRef && this.state.dataRef.events ? _.orderBy(this.state.dataRef.events, 'eventStart', 'asc').map((d, i) => {
            if (d.reservation && Date.now() < d.eventEnd) {
                return (
                    <Col key={d.eventName + i} className="table-margin" xs={12} md={6} xl={4}>
                        <ReservationCard event={d} />
                    </Col>
                )
            } else {
                return <div key={d}></div>;
            }
        }) : [];

        return (
            <div>
                {this.props.selectedTrip === "" && <NoTrips />}
                {this.props.selectedTrip !== "" &&
                    this.state.dataRef && (
                        <div>
                            <Grid>
                                <Row id="reservations">
                                    {events}
                                    {events.length === 0 &&
                                        <div className="contain-noreserv">
                                            <div className="notrips unselectable">
                                                <p>You have no reservations.</p>
                                                <p>Create reservations in the Itinerary tab.</p>
                                            </div>
                                        </div>
                                    }
                                    {/* <Col className="table-margin" xs={12} md={6} xl={4}>
                                        <div className="new-category" onClick={this.addReservation}>
                                            <p className="unselectable new-category-text">+ Add Reservation</p>
                                        </div>
                                    </Col> */}
                                </Row>
                            </Grid>
                        </div>
                    )}
            </div>
        );
    }
}

class ReservationCard extends Component {
    render() {
        return (
            <div>
                <Card className="reservation-card">
                    <CardMedia>
                        <img
                            src={this.props.event.imageURL ? this.props.event.imageURL : 'img/placeholder.png'}
                            alt={this.props.event.eventName}
                        />
                    </CardMedia>
                    <CardHeader
                        title={`${this.props.event.eventName} -- ${this.props.event.location}`}
                        subtitle={(new Date(this.props.event.eventStart)).toLocaleString()}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText
                        className="reservation-description"
                        expandable={true}
                    >
                        {this.props.event.description}
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default Reservations;