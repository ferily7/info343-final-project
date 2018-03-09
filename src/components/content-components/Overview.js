import React, { Component } from "react";
import firebase from "firebase";
import { Grid, Row, Col } from "react-flexbox-grid";
import NoTrips from "./NoTrips";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRef: null
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
                    this.setState({
                        dataRef: snapshot.val()[this.props.selectedTrip]
                            ? snapshot.val()[this.props.selectedTrip]
                            : snapshot.val()
                    });
                }
            });
        }
    }

    // Set unmount state so doesn't update when not mounted anymore
    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <div>
                {this.props.selectedTrip === "" && <NoTrips />}
                {this.props.selectedTrip !== "" &&
                    this.state.dataRef && (
                        <div>
                            {this.props.selectedTrip === "" && <NoTrips />}
                            {this.props.selectedTrip !== "" &&
                                this.state.dataRef && (
                                    <Grid>
                                        <Row>
                                            <Col xs={12}>
                                                <h1 className="content-header">
                                                    {this.state.dataRef.tripName}
                                                </h1>
                                                <p className="origin-destination">
                                                    {this.state.dataRef.startLocation} to{" "}
                                                    {this.state.dataRef.endLocation}
                                                </p>
                                                <p className="start-end">
                                                    {new Date(
                                                        this.state.dataRef.dateStart
                                                    ).toLocaleDateString()}{" "}
                                                    until{" "}
                                                    {new Date(
                                                        this.state.dataRef.dateEnd
                                                    ).toLocaleDateString()}
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={6} xl={4}>
                                                <h2 className="content-subheader">Departing <span
                                                    className="overview-button"
                                                    onClick={console.log("edit departing button")}
                                                ><FontAwesomeIcon className="fa-spacer" icon={faPencilAlt} />Edit</span></h2>
                                                <ul className="overview-list">
                                                    <li className="overview-li">[AIRLINE]</li>
                                                    <li className="overview-li">Departs: [TIME DATE]</li>
                                                    <li className="overview-li">Arrives: [TIME DATE]</li>
                                                </ul>

                                            </Col>
                                            <Col xs={12} md={6} xl={4}>
                                                <h2 className="content-subheader">Returning <span
                                                    className="overview-button"
                                                    onClick={console.log("edit returning button")}
                                                ><FontAwesomeIcon className="fa-spacer" icon={faPencilAlt} />Edit</span></h2>
                                                <ul className="overview-list">
                                                    <li className="overview-li">[AIRLINE]</li>
                                                    <li className="overview-li">Departs: [TIME DATE]</li>
                                                    <li className="overview-li">Arrives: [TIME DATE]</li>
                                                </ul>
                                            </Col>
                                            <Col xs={12} md={6} xl={4}>
                                                <h2 className="content-subheader">Travelers <span
                                                    className="overview-button"
                                                    onClick={console.log("edit travelers button")}
                                                ><FontAwesomeIcon className="fa-spacer" icon={faPencilAlt} />Edit</span></h2>
                                                <ul className="overview-list">
                                                    <li className="overview-li">Travelers: {this.state.dataRef.numTravelers}</li>
                                                    <li className="overview-li">[TRAVELER 1 NAME]</li>
                                                    <li className="overview-li">[TRAVELER 2 NAME]</li>
                                                </ul>
                                            </Col>
                                        </Row>
                                        

                                    </Grid>
                                )}
                        </div>
                    )}
            </div>
        );
    }
}

export default Overview;
