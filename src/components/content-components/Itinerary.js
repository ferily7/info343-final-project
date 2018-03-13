import React, { Component } from "react";
import firebase from "firebase";
import NoTrips from "./NoTrips";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "./calendar.css";
import { Grid, Row, Col } from "react-flexbox-grid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUpload, faTimesCircle } from "@fortawesome/fontawesome-free-solid";
// material ui components
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import DateTimePicker from "material-ui-datetimepicker";
import DatePickerDialog from "material-ui/DatePicker/DatePickerDialog";
import TimePickerDialog from "material-ui/TimePicker/TimePickerDialog";
import TextField from "material-ui/TextField";

// Set localizer for BigCalendar (must be over here)
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Itinerary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRef: null,
            errorMessage: "",
            dialogOpen: false,
            editDialogOpen: false,
            cost: 0,
            eventEnd: 0,
            eventStart: 0,
            eventName: "",
            location: "",
            reservation: false,
            type: "Uncategorized",
            editEvent: "",
            description: "",
            image: null
        };
    }

    // setImage sets the state of the current selected image
    setImage = e => {
        this.setState({ image: e.target.files[0] });
    };

    // checkError checks if the state values are valid
    // if they are, errorMessages are sent and nothing is returned, otherwise a "1" is returned
    checkError = () => {
        if (
            this.state.eventEnd === 0 ||
            this.state.eventStart === 0 ||
            this.state.eventStart > this.state.eventEnd
        ) {
            this.setState({ errorMessage: "Invalid dates chosen" });
        } else if (this.state.eventName === "") {
            this.setState({ errorMessage: "Event name cannot be empty" });
        } else if (this.state.location === "") {
            this.setState({ errorMessage: "Invalid location" });
        } else if (this.state.type === "") {
            this.setState({ errorMessage: "Type of event not chosen" });
        } else if (this.state.cost < 0) {
            this.setState({ errorMessage: "Invalid cost" });
        } else {
            return 1;
        }
    };

    // handle edit dialogues
    handleEditDialogOpen = () => {
        this.setState({ editDialogOpen: true });
    };
    handleEditDialogClose = () => {
        this.setState({ editDialogOpen: false });
    };

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
                type: this.state.type,
                description: this.state.description
            };
            this.dataRef.child(`events/${this.state.editEvent}`).update(pushObj);
            this.setState({
                errorMessage: "",
                cost: 0,
                eventEnd: 0,
                eventStart: 0,
                eventName: "",
                location: "",
                reservation: false,
                type: "",
                editDialogOpen: false,
                editEvent: "",
                description: ""
            });
        }
    };

    // handleEditEventDelete will delete events based on the current selected event
    handleEditEventDelete = () => {
        this.dataRef.child(`events/${this.state.editEvent}`).remove();
        this.setState({
            errorMessage: "",
            cost: 0,
            eventEnd: 0,
            eventStart: 0,
            eventName: "",
            location: "",
            reservation: false,
            type: "",
            editDialogOpen: false,
            editEvent: "",
            description: "",
            image: null
        });
    };

    // Open and close the dialog
    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    };
    handleDialogClose = () => {
        this.setState({
            errorMessage: null,
            cost: 0,
            eventEnd: 0,
            eventStart: 0,
            eventName: "",
            location: "",
            reservation: false,
            type: "",
            dialogOpen: false,
            description: "",
            image: null
        });
    };

    // Submits an event to the database
    // Error messages are sent if certain state values are invalid
    handleDialogSubmit = () => {
        if (this.checkError() === 1) {
            if (this.state.image) {
                let imagePush = this.storageRef.child(
                    `${this.state.eventName}${this.state.eventStart}`
                );
                imagePush.put(this.state.image).then(snapshot => {
                    let pushObj = {
                        cost: this.state.cost,
                        eventEnd: this.state.eventEnd,
                        eventStart: this.state.eventStart,
                        eventName: this.state.eventName,
                        location: this.state.location,
                        reservation: this.state.reservation,
                        type: this.state.type,
                        description: this.state.description,
                        imageURL: snapshot.downloadURL
                    };
                    this.dataRef.child("events").push(pushObj);
                    this.setState({
                        errorMessage: "",
                        cost: 0,
                        eventEnd: 0,
                        eventStart: 0,
                        eventName: "",
                        location: "",
                        reservation: false,
                        type: "",
                        dialogOpen: false,
                        description: "",
                        image: null
                    });
                });
            } else {
                let pushObj = {
                    cost: this.state.cost,
                    eventEnd: this.state.eventEnd,
                    eventStart: this.state.eventStart,
                    eventName: this.state.eventName,
                    location: this.state.location,
                    reservation: this.state.reservation,
                    type: this.state.type,
                    description: this.state.description
                };
                this.dataRef.child("events").push(pushObj);
                this.setState({
                    errorMessage: "",
                    cost: 0,
                    eventEnd: 0,
                    eventStart: 0,
                    eventName: "",
                    location: "",
                    reservation: false,
                    type: "",
                    dialogOpen: false,
                    description: "",
                    image: null
                });
            }
        }
    };

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
        this.storageRef = firebase.storage().ref("imgs/");
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
                {this.props.selectedTrip === "" && <NoTrips />}
                {this.state.errorMessage && (
                    <div>
                        <p className="alert alert-danger">{this.state.errorMessage}</p>
                    </div>
                )}
                {this.props.selectedTrip !== "" &&
                    this.state.dataRef && (
                        <div>
                            <BigCalendar
                                selectable={"ignoreEvents"}
                                events={
                                    this.state.dataRef.events
                                        ? Object.keys(this.state.dataRef.events).map((d, i) => {
                                            let returnObj = {
                                                id: 0,
                                                name: d,
                                                title: this.state.dataRef.events[d].eventName,
                                                start: new Date(
                                                    this.state.dataRef.events[d].eventStart
                                                ),
                                                end: new Date(this.state.dataRef.events[d].eventEnd),
                                                type: this.state.dataRef.events[d].type,
                                                cost: this.state.dataRef.events[d].cost,
                                                reservation: this.state.dataRef.events[d].reservation,
                                                location: this.state.dataRef.events[d].location,
                                                description: this.state.dataRef.events[d].description
                                            };
                                            return returnObj;
                                        })
                                        : []
                                }
                                longPressThreshold={125}
                                defaultView="week"
                                views={["week"]}
                                scrollToTime={new Date(1970, 1, 1, 6)}
                                defaultDate={new Date(this.state.dataRef.dateStart)}
                                onSelectEvent={event => {
                                    //alert(event.title)
                                    this.setState({
                                        eventStart: new Date(event.start).getTime(),
                                        eventEnd: new Date(event.end).getTime(),
                                        eventName: event.title,
                                        type: event.type,
                                        cost: event.cost,
                                        reservation: event.reservation,
                                        location: event.location,
                                        description: event.description,
                                        editEvent: event.name
                                    });
                                    this.handleEditDialogOpen();
                                }}
                                onSelectSlot={slotInfo => {
                                    this.setState({
                                        eventStart: slotInfo.start.getTime(),
                                        eventEnd: slotInfo.end.getTime()
                                    });
                                    this.handleDialogOpen();
                                }}
                            />

                            <Dialog
                                title="New Event"
                                actions={dialogActions}
                                open={this.state.dialogOpen}
                                onRequestClose={this.handleDialogClose}
                                autoScrollBodyContent={true}
                            >
                                <p className="highlight">{this.state.errorMessage}</p>

                                <Grid className="neg-margin">
                                    <Row>
                                        <Col className="no-padding" xs={12} md={6}>
                                            <TextField
                                                className="auth-input"
                                                name="eventName"
                                                hintText="Name your event..."
                                                floatingLabelText="Name"
                                                type="text"
                                                fullWidth={true}
                                                onChange={event => {
                                                    this.setState({ eventName: event.target.value });
                                                }}
                                            />
                                        </Col>
                                        <Col className="no-padding" xs={12} md={6}>
                                            <TextField
                                                className="auth-input"
                                                name="location"
                                                hintText="Where will this event be?"
                                                floatingLabelText="Location"
                                                type="text"
                                                fullWidth={true}
                                                onChange={event => {
                                                    this.setState({ location: event.target.value });
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="no-padding" xs={12} sm={6}>
                                            {/* See http://www.material-ui.com/#/components/date-picker set min/max date */}
                                            <DateTimePicker
                                                className="extra-margin"
                                                hintText="From"
                                                fullWidth={true}
                                                DatePicker={DatePickerDialog}
                                                TimePicker={TimePickerDialog}
                                                value={new Date(this.state.eventStart).toLocaleString()}
                                                clearIcon={null}
                                                onChange={date => {
                                                    this.setState({ eventStart: date.getTime ? date.getTime() : null });
                                                }}
                                            />
                                        </Col>
                                        <Col className="no-padding" xs={12} sm={6}>
                                            <DateTimePicker
                                                className="extra-margin"
                                                hintText="Until"
                                                fullWidth={true}
                                                DatePicker={DatePickerDialog}
                                                TimePicker={TimePickerDialog}
                                                value={new Date(this.state.eventEnd).toLocaleString()}
                                                clearIcon={null}
                                                onChange={date => {
                                                    this.setState({ eventEnd: date.getTime ? date.getTime() : null });
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <TextField
                                            className="auth-input"
                                            name="description"
                                            hintText="Include any notes or details."
                                            floatingLabelText="Description"
                                            type="text"
                                            fullWidth={true}
                                            onChange={event => {
                                                this.setState({ description: event.target.value });
                                            }}
                                        />
                                    </Row>
                                    <Row>
                                        <p className="optional-fields">Optional budget {"&"} reservation information:</p>
                                        </Row>
                                    <Row>
                                        <Col className="no-padding" xs={12} sm={4}>
                                            <TextField
                                                className="auth-input"
                                                name="travelerCount"
                                                hintText="0.00"
                                                floatingLabelText="Estimated Cost"
                                                type="number"
                                                fullWidth={true}
                                                onChange={event => {
                                                    this.setState({ cost: Number(event.target.value) });
                                                }}
                                            />
                                        </Col>
                                        <Col className="no-padding" xs={12} sm={8}>
                                            <SelectField
                                                className="auth-input"
                                                floatingLabelText="Event Category"
                                                value={this.state.type}
                                                onChange={event => {
                                                    this.setState({ type: event.target.textContent });
                                                }}
                                                fullWidth={true}
                                            >
                                                <MenuItem value="" primaryText="" />
                                                {this.state.dataRef.categories.map((d, i) => {
                                                    return <MenuItem key={d} value={d} primaryText={d} />;
                                                })}
                                            </SelectField>
                                        </Col>
                                    </Row>
                                    <Row className="extra-margin">
                                        <Col className="no-padding" xs={12} sm={6}>
                                            <Checkbox
                                                label="Reservation made?"
                                                checked={this.state.reservation}
                                                onCheck={() =>
                                                    this.setState({ reservation: !this.state.reservation })
                                                }
                                                style={{ marginTop: 16 }}
                                            />
                                        </Col>
                                        <Col className="no-padding" xs={12} sm={6}>
                                            <Row className="extra-margin">
                                                {this.state.reservation && (
                                                    <RaisedButton
                                                        secondary={true}
                                                        containerElement="label"
                                                        label="Image"
                                                        icon={<FontAwesomeIcon icon={faUpload} />}
                                                    >
                                                        <input
                                                            type="file"
                                                            onChange={e => this.setImage(e)}
                                                            style={{ display: "none" }}
                                                        />
                                                    </RaisedButton>
                                                )}
                                            </Row>
                                            <Row>
                                                {this.state.image && this.state.reservation && (
                                                    <div>
                                                        <p className="image-uploaded">
                                                            Your file has been uploaded.{" "}
                                                            <span
                                                                className="file-delete highlight"
                                                                onClick={() => this.setState({ image: null })}
                                                            >
                                                                <FontAwesomeIcon
                                                                    className="fa-spacer"
                                                                    icon={faTimesCircle}
                                                                />
                                                            </span>
                                                        </p>
                                                    </div>
                                                )}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Dialog>

                            {/* Edit dialogue */}
                            <Dialog
                                title="Edit Event"
                                actions={editDialogActions}
                                open={this.state.editDialogOpen}
                                onRequestClose={this.handleEditDialogClose}
                                autoScrollBodyContent={true}
                            >
                                <p className="highlight">{this.state.errorMessage}</p>
                                <Grid className="neg-margin">
                                    <Row>
                                        <TextField
                                            className="auth-input"
                                            name="eventName"
                                            hintText="Name your event..."
                                            floatingLabelText="Event Name"
                                            type="text"
                                            fullWidth={true}
                                            value={this.state.eventName}
                                            onChange={event => {
                                                this.setState({ eventName: event.target.value });
                                            }}
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
                                            onChange={event => {
                                                this.setState({ location: event.target.value });
                                            }}
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
                                                onChange={date => {
                                                    this.setState({ eventStart: date.getTime ? date.getTime() : null });
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
                                                onChange={date => {
                                                    this.setState({ eventEnd: date.getTime ? date.getTime() : null });
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
                                            onChange={event => {
                                                this.setState({ cost: Number(event.target.value) });
                                            }}
                                        />
                                    </Row>
                                    <Row>
                                        <TextField
                                            className="auth-input"
                                            name="description"
                                            hintText="Event description"
                                            floatingLabelText="Event description"
                                            type="text"
                                            fullWidth={true}
                                            value={this.state.description}
                                            onChange={event => {
                                                this.setState({ description: event.target.value });
                                            }}
                                        />
                                    </Row>
                                    <Row>
                                        <SelectField
                                            floatingLabelText="Type of event"
                                            value={this.state.type}
                                            onChange={event => {
                                                this.setState({ type: event.target.textContent });
                                            }}
                                            fullWidth={true}
                                        >
                                            <MenuItem value="" primaryText="" />
                                            {this.state.dataRef.categories.map((d, i) => {
                                                return <MenuItem key={d} value={d} primaryText={d} />;
                                            })}
                                        </SelectField>
                                    </Row>
                                    <Row>
                                        <Checkbox
                                            label="Reservation made?"
                                            checked={this.state.reservation}
                                            onCheck={() =>
                                                this.setState({ reservation: !this.state.reservation })
                                            }
                                            style={{ marginTop: 16 }}
                                        />

                                    </Row>
                                </Grid>
                            </Dialog>
                        </div>
                    )}
            </div>
        );
    }
}

export default Itinerary;
