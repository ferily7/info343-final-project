import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
// material ui components
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            orgReference: null,
            dialogOpen: false
        };
    }
    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    };

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    };
    handleDialogSubmit = () => {
        this.setState({ dialogOpen: false });
        // Add code to handle submit + create new trip
    };
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
            this.orgReference = firebase
                .database()
                .ref(`${this.props.firebaseUser.uid}/trips`);
            this.orgReference.on("value", snapshot => {
                if (this.mounted) {
                    this.setState({ orgReference: snapshot.val() });
                }
            });
        }
    }
    render() {
        const dialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleDialogClose}
            />,
            <RaisedButton
                label="Create"
                primary={true}
                onClick={this.handleDialogSubmit}
            />
        ];
        return (
            <div>
                {this.props.firebaseUser ? undefined : <Redirect to="/" />}
                <div className="sidebar">
                <div className="sidebar-content">
                    <List className="trip-list">
                        {this.state.orgReference &&
                            Object.keys(this.state.orgReference).map((d, i) => {
                                return (
                                    <ListItem
                                        className="trip-list-item"
                                        key={d}
                                        primaryText={this.state.orgReference[d].tripName}
                                        onClick={() => this.props.changeSelectedTrip(d)}
                                    />
                                );
                            })}
                        {/* <ListItem className="trip-list-item" primaryText="Trip 1" />
                        <ListItem className="trip-list-item" primaryText="Trip 2" />
                        <ListItem className="trip-list-item" primaryText="Trip 3" />
                        <ListItem className="trip-list-item" primaryText="Trip 4" /> */}
                        <ListItem
                            id="new-trip"
                            className="trip-list-item"
                            primaryText="+ New"
                            onClick={this.handleDialogOpen}
                        />
                    </List>

                    <RaisedButton
                        className="signout-button"
                        label="Sign Out"
                        primary={true}
                        onClick={() => this.handleSignOut()}
                    />

                    <Dialog
                        title="Plan a New Trip"
                        actions={dialogActions}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={this.handleDialogClose}
                    >
                        <Grid>
                            <Row>
                                <TextField
                                    className="auth-input"
                                    name="tripName"
                                    hintText="Name your trip..."
                                    floatingLabelText="Trip Name"
                                    type="text"
                                    fullWidth={true}
                                    onChange={(event) => { console.log(event.target.name, event.target.value) }}
                                />
                            </Row>
                            <Row>
                                <TextField
                                    className="auth-input"
                                    name="Destination"
                                    hintText="Where are you going?"
                                    floatingLabelText="Destination"
                                    type="text"
                                    fullWidth={true}
                                />
                            </Row>
                            <Row>
                                <Col className="no-padding" xs={12} sm={6}>
                                    {/* See http://www.material-ui.com/#/components/date-picker set min/max date */}
                                    <DatePicker
                                        className="date-input"
                                        hintText="From"
                                        fullWidth={true}
                                    />
                                </Col>
                                <Col className="no-padding" xs={12} sm={6}>
                                    <DatePicker
                                        className="date-input"
                                        hintText="Until"
                                        fullWidth={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <TextField
                                    className="auth-input"
                                    name="Number of travelers"
                                    hintText="How many travelers?"
                                    floatingLabelText="Travelers"
                                    type="text"
                                    fullWidth={true}
                                />
                            </Row>
                        </Grid>
                    </Dialog>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
