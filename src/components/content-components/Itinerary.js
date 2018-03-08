import React, { Component } from 'react';
import firebase from 'firebase';
import NoTrips from "./NoTrips";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Grid, Row, Col } from "react-flexbox-grid";
// material ui components
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import TextField from "material-ui/TextField";

// Set localizer for BigCalendar (must be over here)
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Itinerary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRef: null,
            errorMessage: '',
            dialogOpen: false,
            editDialogOpen: false,
            cost: 0,
            eventEnd: 0,
            eventStart: 0,
            eventName: '',
            location: '',
            reservation: false,
            type: '',
            editEvent: ''
        }
    }

    // checkError checks if the state values are valid
    // if they are, errorMessages are sent and nothing is returned, otherwise a "1" is returned
    checkError = () => {
        if (this.state.eventEnd === 0 || this.state.eventStart === 0 || this.state.eventStart > this.state.eventEnd) {
            this.setState({ errorMessage: "Invalid dates chosen" });
        } else if (this.state.eventName === "") {
            this.setState({ errorMessage: "Event name cannot be empty" });
        } else if (this.state.location === "") {
            this.setState({ errorMessage: "Invalid location" });
        } else if (this.state.type === "") {
            this.setState({ errorMessage: "Type of event not chosen" });
        } else {
            return 1;
        }
    }

    // handle edit dialogues
    handleEditDialogOpen = () => {
        this.setState({ editDialogOpen: true });
    }
    handleEditDialogClose = () => {
        this.setState({ editDialogOpen: false });
    }

    // handleEditDialogSubmit will handle the changes to the database for editing an event
    handleEditDialogSubmit = () => {
        if (this.checkError() === 1) {
            let pushObj = {
                cost: this.state.cost,
                eventEnd: this.state.eventEnd,
                eventStart: this.state.eventStart,
                eventName: this.state.eventName,
                location: this.state.location,
                reservation: this.state.reservation,
                type: this.state.type
            }
            this.dataRef.child(`events/${this.state.editEvent}`).update(pushObj);
            this.setState({
                errorMessage: '',
                cost: 0,
                eventEnd: 0,
                eventStart: 0,
                eventName: '',
                location: '',
                reservation: false,
                type: '',
                editDialogOpen: false,
                editEvent: ''
            });
        }
    }

    // handleEditEventDelete will delete events based on the current selected event
    handleEditEventDelete = () => {
        this.dataRef.child(`events/${this.state.editEvent}`).remove();
        this.setState({
            errorMessage: '',
            cost: 0,
            eventEnd: 0,
            eventStart: 0,
            eventName: '',
            location: '',
            reservation: false,
            type: '',
            editDialogOpen: false,
            editEvent: ''
        });
    }

    // Open and close the dialog
    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    };
    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    };

    // Submits an event to the database
    // Error messages are sent if certain state values are invalid
    handleDialogSubmit = () => {
        if (this.checkError() === 1) {
            let pushObj = {
                cost: this.state.cost,
                eventEnd: this.state.eventEnd,
                eventStart: this.state.eventStart,
                eventName: this.state.eventName,
                location: this.state.location,
                reservation: this.state.reservation,
                type: this.state.type
            }
            this.dataRef.child("events").push(pushObj);
            this.setState({
                errorMessage: '',
                cost: 0,
                eventEnd: 0,
                eventStart: 0,
                eventName: '',
                location: '',
                reservation: false,
                type: '',
                dialogOpen: false
            });
        }
    };

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
                    this.setState({ dataRef: snapshot.val()[this.props.selectedTrip] ? snapshot.val()[this.props.selectedTrip] : snapshot.val() });
                }
            })
        }
    }

    // Set unmount state so doesn't update when not mounted anymore
    componentWillUnmount() {
        this.mounted = false;
    }

    // handleChange to change the event state based on a string, taken from class example
    handleChange(event) {
        let value = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = value;
        this.setState(change);
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
        const editDialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleEditDialogClose}
            />,
            <RaisedButton
                className="cancel-button"
                label="Delete event"
                secondary={true}
                onClick={this.handleEditEventDelete}
            />,
            <RaisedButton
                label="Make edits"
                primary={true}
                onClick={this.handleEditDialogSubmit}
            />
        ];
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
                            selectable={'ignoreEvents'}
                            events={this.state.dataRef.events ? Object.keys(this.state.dataRef.events).map((d, i) => {
                                let returnObj = {
                                    id: 0,
                                    name: d,
                                    title: this.state.dataRef.events[d].eventName,
                                    start: new Date(this.state.dataRef.events[d].eventStart),
                                    end: new Date(this.state.dataRef.events[d].eventEnd),
                                    type: this.state.dataRef.events[d].type,
                                    cost: this.state.dataRef.events[d].cost,
                                    reservation: this.state.dataRef.events[d].reservation,
                                    location: this.state.dataRef.events[d].location
                                }
                                return returnObj;
                            }) : []}
                            longPressThreshold={125}
                            defaultView="week"
                            views={['week']}
                            scrollToTime={new Date(1970, 1, 1, 6)}
                            defaultDate={new Date(this.state.dataRef.dateStart)}
                            onSelectEvent={(event) => {
                                //alert(event.title)
                                this.setState({
                                    eventStart: new Date(event.start),
                                    eventEnd: new Date(event.end),
                                    eventName: event.title,
                                    type: event.type,
                                    cost: event.cost,
                                    reservation: event.reservation,
                                    location: event.location,
                                    editEvent: event.name
                                })
                                this.handleEditDialogOpen();
                            }}
                            onSelectSlot={(slotInfo) => {
                                this.setState({
                                    eventStart: slotInfo.start.getTime(),
                                    eventEnd: slotInfo.end.getTime()
                                });
                                this.handleDialogOpen();
                            }
                            }

                        />

                        <Dialog
                            title="New Event"
                            actions={dialogActions}
                            modal={true}
                            open={this.state.dialogOpen}
                            onRequestClose={this.handleDialogClose}
                        >
                            <Grid>
                                <Row>
                                    <TextField
                                        className="auth-input"
                                        name="eventName"
                                        hintText="Name your event..."
                                        floatingLabelText="Event Name"
                                        type="text"
                                        fullWidth={true}
                                        onChange={(event) => { this.setState({ eventName: event.target.value }) }}
                                    />
                                </Row>
                                <Row>
                                    <TextField
                                        className="auth-input"
                                        name="location"
                                        hintText="Where will this event be?"
                                        floatingLabelText="Location"
                                        type="text"
                                        fullWidth={true}
                                        onChange={(event) => { this.setState({ location: event.target.value }) }}
                                    />
                                </Row>
                                <Row>
                                    <Col className="no-padding" xs={12} sm={6}>
                                        {/* See http://www.material-ui.com/#/components/date-picker set min/max date */}
                                        <DateTimePicker
                                            className="date-input"
                                            hintText="From"
                                            fullWidth={true}
                                            DatePicker={DatePickerDialog}
                                            TimePicker={TimePickerDialog}
                                            value={new Date(this.state.eventStart).toLocaleString()}
                                            clearIcon={null}
                                            onChange={(date) => {
                                                this.setState({ eventStart: date.getTime() })
                                            }}
                                        />
                                    </Col>
                                    <Col className="no-padding" xs={12} sm={6}>
                                        <DateTimePicker
                                            className="date-input"
                                            hintText="Until"
                                            fullWidth={true}
                                            DatePicker={DatePickerDialog}
                                            TimePicker={TimePickerDialog}
                                            value={new Date(this.state.eventEnd).toLocaleString()}
                                            clearIcon={null}
                                            onChange={(date) => {
                                                this.setState({ eventEnd: date.getTime() })
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <TextField
                                        className="auth-input"
                                        name="travelerCount"
                                        hintText="What is the cost?"
                                        floatingLabelText="Est. cost"
                                        type="number"
                                        fullWidth={true}
                                        onChange={(event) => { this.setState({ cost: Number(event.target.value) }) }}
                                    />
                                </Row>
                                <Row>
                                    <SelectField
                                        floatingLabelText="Type of event"
                                        value={this.state.type}
                                        onChange={(event) => { this.setState({ type: event.target.textContent }) }}
                                        fullWidth={true}
                                    >
                                        <MenuItem value="" primaryText="" />
                                        <MenuItem value="Dining" primaryText="Dining" />
                                        <MenuItem value="Services" primaryText="Services" />
                                        <MenuItem value="Experiences" primaryText="Experiences" />
                                        <MenuItem value="Shopping" primaryText="Shopping" />
                                        <MenuItem value="Other" primaryText="Other" />
                                    </SelectField>
                                </Row>
                                <Row>
                                    <Checkbox
                                        label="Reservation made?"
                                        checked={this.state.reservation}
                                        onCheck={() => this.setState({ reservation: !this.state.reservation })}
                                        style={{ marginTop: 16 }}
                                    />
                                </Row>
                            </Grid>
                        </Dialog>

                        <Dialog
                            title="Edit Event"
                            actions={editDialogActions}
                            modal={true}
                            open={this.state.editDialogOpen}
                            onRequestClose={this.handleEditDialogClose}
                        >
                            <Grid>
                                <Row>
                                    <TextField
                                        className="auth-input"
                                        name="eventName"
                                        hintText="Name your event..."
                                        floatingLabelText="Event Name"
                                        type="text"
                                        fullWidth={true}
                                        value={this.state.eventName}
                                        onChange={(event) => { this.setState({ eventName: event.target.value }) }}
                                    />
                                </Row>
                                <Row>
                                    <TextField
                                        className="auth-input"
                                        name="location"
                                        hintText="Where will this event be?"
                                        floatingLabelText="Location"
                                        type="text"
                                        fullWidth={true}
                                        value={this.state.location}
                                        onChange={(event) => { this.setState({ location: event.target.value }) }}
                                    />
                                </Row>
                                <Row>
                                    <Col className="no-padding" xs={12} sm={6}>
                                        {/* See http://www.material-ui.com/#/components/date-picker set min/max date */}
                                        <DateTimePicker
                                            className="date-input"
                                            hintText="From"
                                            fullWidth={true}
                                            DatePicker={DatePickerDialog}
                                            TimePicker={TimePickerDialog}
                                            value={new Date(this.state.eventStart).toLocaleString()}
                                            clearIcon={null}
                                            onChange={(date) => {
                                                this.setState({ eventStart: date.getTime() })
                                            }}
                                        />
                                    </Col>
                                    <Col className="no-padding" xs={12} sm={6}>
                                        <DateTimePicker
                                            className="date-input"
                                            hintText="Until"
                                            fullWidth={true}
                                            DatePicker={DatePickerDialog}
                                            TimePicker={TimePickerDialog}
                                            value={new Date(this.state.eventEnd).toLocaleString()}
                                            clearIcon={null}
                                            onChange={(date) => {
                                                this.setState({ eventEnd: date.getTime() })
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <TextField
                                        className="auth-input"
                                        name="travelerCount"
                                        hintText="What is the cost?"
                                        floatingLabelText="Est. cost"
                                        type="number"
                                        fullWidth={true}
                                        value={this.state.cost}
                                        onChange={(event) => { this.setState({ cost: Number(event.target.value) }) }}
                                    />
                                </Row>
                                <Row>
                                    <SelectField
                                        floatingLabelText="Type of event"
                                        value={this.state.type}
                                        onChange={(event) => { this.setState({ type: event.target.textContent }) }}
                                        fullWidth={true}
                                    >
                                        <MenuItem value="" primaryText="" />
                                        <MenuItem value="Dining" primaryText="Dining" />
                                        <MenuItem value="Services" primaryText="Services" />
                                        <MenuItem value="Experiences" primaryText="Experiences" />
                                        <MenuItem value="Shopping" primaryText="Shopping" />
                                        <MenuItem value="Other" primaryText="Other" />
                                    </SelectField>
                                </Row>
                                <Row>
                                    <Checkbox
                                        label="Reservation made?"
                                        checked={this.state.reservation}
                                        onCheck={() => this.setState({ reservation: !this.state.reservation })}
                                        style={{ marginTop: 16 }}
                                    />
                                </Row>
                            </Grid>
                        </Dialog>
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