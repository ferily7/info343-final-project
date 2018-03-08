import React, { Component } from "react";
import firebase from "firebase";
import { Grid, Row, Col } from "react-flexbox-grid";
import NoTrips from "./NoTrips";
// material ui components
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRef: null,
            reservations: null
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
                if (this.mounted) {
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
        return (
            <div>
                {this.props.selectedTrip === "" && <NoTrips />}
                {this.props.selectedTrip !== "" &&
                    this.state.dataRef && (
                        <div>
                            <Grid>
                                <Row>
                                    <Col xs={12} md={6} xl={4}>
                                        <Cards />
                                    </Col>
                                </Row>
                            </Grid>
                        </div>
                    )}
            </div>
        );
    }
}
class Cards extends Component{
  
  render(){
    return (
      <div>
        <Card className="reservation-card">
          <CardMedia>
            <img
              src="img/placeholder.png"
              alt="placeholder"
            />
          </CardMedia>
          <CardHeader
            title="Add Reservation"
            subtitle="[DATE TIME]"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText
            className="reservation-description"
            expandable={true}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla
            facilisi. Donec vulputate interdum sollicitudin. Nunc
            lacinia auctor quam sed pellentesque. Aliquam dui
            mauris, mattis quis lacus id, pellentesque lobortis
            odio.
          </CardText>
                    <CardActions className="reservation-actions">
                        <RaisedButton primary={true} label="Edit" />
                        <RaisedButton
                            secondary={true}
                            className="cancel-button"
                            label="Delete"
                        />
                    </CardActions>
                </Card>
            </div>
        )
    }
}


export default Reservations;
