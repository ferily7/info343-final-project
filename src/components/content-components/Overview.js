import React, { Component } from "react";
import firebase from "firebase";
import { Grid, Row, Col } from "react-flexbox-grid";
import NoTrips from "./NoTrips";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid';
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import DateTimePicker from "material-ui-datetimepicker";
import DatePickerDialog from "material-ui/DatePicker/DatePickerDialog";
import TimePickerDialog from "material-ui/TimePicker/TimePickerDialog";
import TextField from "material-ui/TextField";

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRef: null,
            departDialogOpen: false,
            arriveDialogOpen: false,
            editDepartDialogOpen: false,
            editArriveDialogOpen: false,
            notesDialogOpen: false,
            editNotesDialogOpen: false,
            errorMessage: "",
            airlineName: "",
            departTime: 0,
            arrivalTime: 0,
            confirmation: "",
            notes: "",
            travelers: ""
        };
    }

    // Opens the departing flight dialog
    handleDepartDialogOpen = () => {
        this.setState({ departDialogOpen: true });
    };

    // Closes the departing flight dialog
    handleDialogClose = () => {
        this.setState({
            departDialogOpen: false,
            arriveDialogOpen: false,
            editDepartDialogOpen: false,
            editArriveDialogOpen: false,
            notesDialogOpen: false,
            editNotesDialogOpen: false,
            travelersDialogOpen: false,
            editTravelersDialogOpen: false,
            errorMessage: null,
            airlineName: "",
            departTime: 0,
            arrivalTime: 0,
            confirmation: "",
            travelers: ""
        });
    };

    // Opens dialog to edit departing flight
    handleEditDepartDialogOpen = () => {
        this.setState({ 
            editDepartDialogOpen: true,
            airlineName: this.state.dataRef.departing.airlineName,
            departTime: this.state.dataRef.departing.departTime,
            arrivalTime: this.state.dataRef.departing.arrivalTime,
            confirmation: this.state.dataRef.departing.confirmation
        });
    };

    // Sets and updates the data to the firebase based on user input
    handleDepartDialogSubmit = () => {
        if (this.state.airlineName === '') {
            this.setState({ errorMessage: "Airline name cannot be empty" });
        }
        else if (this.state.confirmation === '') {
            this.setState({ errorMessage: "Confirmation code cannot be empty" });
        } else if (this.state.departTime === 0 || this.state.arrivalTime === 0 || this.state.departTime > this.state.arrivalTime) {
            this.setState({ errorMessage: "Invalid dates chosen" });
        } else if (this.state.dataRef.departing == null) {
            let pushObj = {
                airlineName: this.state.airlineName,
                confirmation: this.state.confirmation,
                departTime: this.state.departTime,
                arrivalTime: this.state.arrivalTime
            }
            this.dataRef.child("departing").set(pushObj);
            this.setState({
                departDialogOpen: false,
                editDialogOpen: false,
                airlineName: '',
                confirmation: '',
                departTime: 0,
                arrivalTime: 0
            });
        } else {
            let pushObj = {
                airlineName: this.state.airlineName,
                confirmation: this.state.confirmation,
                departTime: this.state.departTime,
                arrivalTime: this.state.arrivalTime
            }
            this.dataRef.child("departing").update(pushObj);
            this.setState({
                departDialogOpen: false,
                editDepartDialogOpen: false,
                airlineName: '',
                confirmation: '',
                departTime: 0,
                arrivalTime: 0
            });
        }
    };

    // Opens the departing flight dialog
    handleArriveDialogOpen = () => {
        this.setState({ arriveDialogOpen: true });
    };

    // Opens dialog to edit returning flight
    handleEditArriveDialogOpen = () => {
        this.setState({ 
            editArriveDialogOpen: true,
            airlineName: this.state.dataRef.returning.airlineName,
            departTime: this.state.dataRef.returning.departTime,
            arrivalTime: this.state.dataRef.returning.arrivalTime,
            confirmation: this.state.dataRef.returning.confirmation
        });
    };

    // Sets and updates the data to the firebase
    handleArriveDialogSubmit = () => {
        if (this.state.airlineName === '') {
            this.setState({ errorMessage: "Airline name cannot be empty" });
        }
        else if (this.state.confirmation === '') {
            this.setState({ errorMessage: "Confirmation code cannot be empty" });
        } else if (this.state.departTime === 0 || this.state.arrivalTime === 0 || this.state.departTime > this.state.arrivalTime) {
            this.setState({ errorMessage: "Invalid dates chosen" });
        } else if (this.state.dataRef.departing == null) {
            let pushObj = {
                airlineName: this.state.airlineName,
                confirmation: this.state.confirmation,
                departTime: this.state.departTime,
                arrivalTime: this.state.arrivalTime
            }
            this.dataRef.child("returning").set(pushObj);
            this.setState({
                arriveDialogOpen: false,
                editArriveDialogOpen: false,
                airlineName: '',
                confirmation: '',
                departTime: 0,
                arrivalTime: 0
            });
        } else {
            let pushObj = {
                airlineName: this.state.airlineName,
                confirmation: this.state.confirmation,
                departTime: this.state.departTime,
                arrivalTime: this.state.arrivalTime
            }
            this.dataRef.child("returning").update(pushObj);
            this.setState({
                arriveDialogOpen: false,
                editArriveDialogOpen: false,
                airlineName: '',
                confirmation: '',
                departTime: 0,
                arrivalTime: 0
            });
        }
    };

    // Opens the notes dialog
    handleNotesDialogOpen = () => {
        this.setState({ notesDialogOpen: true });
    };

    // Opens dialog to edit notes
    handleEditNotesDialogOpen = () => {
        this.setState({ 
            editNotesDialogOpen: true,
            notes: this.state.dataRef.notes
        });
    };

    // Sets and updates the data to the firebase
    handleNotesDialogSubmit = () => {
        if (this.state.notes === '') {
            this.setState({ errorMessage: "Notes cannot be empty" });
        } else {
            this.dataRef.update({
                notes: this.state.notes
            });
            this.setState({
                notesDialogOpen: false,
                editNotesDialogOpen: false,
                notes: ''
            });
        }
    };

    // Opens the travelers dialog
    handleTravelersDialogOpen = () => {
        this.setState({ travelersDialogOpen: true });
    };

    // Opens dialog to edit travelers' names
    handleEditTravelersDialogOpen = () => {
        this.setState({ 
            editTravelersDialogOpen: true,
            travelers: this.state.dataRef.travelers
        });
    };

    // Sets and updates the data to the firebase
    handleTravelersDialogSubmit = () => {
        if (this.state.travelers === '') {
            this.setState({ errorMessage: "Traveler names cannot be empty" });
        } else {
            let travelersName = this.state.travelers.split(',').map((d, i) => {
                return(d.trim());
            });
            
            let travelersObj = {};
            travelersName.forEach((d, i) => {
                if (d != "") {
                    travelersObj[i] = d
                }
            });

            this.dataRef.child("travelers").set(travelersObj);
            console.log(travelersObj)
            this.setState({
                travelersDialogOpen: false,
                editTravelersDialogOpen: false,
                travelers: ''
            });
        }
    };

    handleDeleteTrip = () => {
        this.dataRef.remove();
        this.props.changeSelectedTrip("");
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
    };

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
    };

    // Set unmount state so doesn't update when not mounted anymore
    componentWillUnmount() {
        this.mounted = false;
    };

    render() {
        const departDialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleDialogClose}
            />,
            <RaisedButton
                label="Create"
                primary={true}
                onClick={this.handleDepartDialogSubmit}
            />
        ];
        const editDepartDialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleDialogClose}
            />,
            <RaisedButton
                label="Update"
                primary={true}
                onClick={this.handleDepartDialogSubmit}
            />
        ];

        const arriveDialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleDialogClose}
            />,
            <RaisedButton
                label="Create"
                primary={true}
                onClick={this.handleArriveDialogSubmit}
            />
        ];
        const editArriveDialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleDialogClose}
            />,
            <RaisedButton
                label="Update"
                primary={true}
                onClick={this.handleArriveDialogSubmit}
            />
        ];

        const notesDialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleDialogClose}
            />,
            <RaisedButton
                label="Create"
                primary={true}
                onClick={this.handleNotesDialogSubmit}
            />
        ];
        const editNotesDialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleDialogClose}
            />,
            <RaisedButton
                label="Update"
                primary={true}
                onClick={this.handleNotesDialogSubmit}
            />
        ];

        const travelersDialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleDialogClose}
            />,
            <RaisedButton
                label="Create"
                primary={true}
                onClick={this.handleTravelersDialogSubmit}
            />
        ];
        const editTravelersDialogActions = [
            <RaisedButton
                className="cancel-button"
                label="Cancel"
                secondary={true}
                onClick={this.handleDialogClose}
            />,
            <RaisedButton
                label="Update"
                primary={true}
                onClick={this.handleTravelersDialogSubmit}
            />
        ];
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
                                                <h2 className="content-subheader header-border">Leaving <span
                                                    className="overview-button"
                                                    onClick={() => {
                                                        this.state.dataRef.departing == null ? this.handleDepartDialogOpen()
                                                        : this.handleEditDepartDialogOpen()
                                                    }}
                                                ><FontAwesomeIcon className="fa-spacer" icon={faPencilAlt} />Edit</span></h2>
                                                <ul className="overview-list">
                                                    <li className="overview-li">Name: {this.state.dataRef.departing != null ? 
                                                        this.state.dataRef.departing.airlineName : '[AIRLINE]'}
                                                    </li>
                                                    <li className="overview-li">Confirmation Code: {this.state.dataRef.departing != null ? 
                                                        this.state.dataRef.departing.confirmation : '[CONFIRMATION CODE]'}
                                                    </li>
                                                    <li className="overview-li">Departs: {this.state.dataRef.departing != null ?
                                                        new Date(this.state.dataRef.departing.departTime).toLocaleString() : '[DATE, TIME]'}
                                                    </li>
                                                    <li className="overview-li">Arrives: {this.state.dataRef.departing != null ?
                                                        new Date(this.state.dataRef.departing.arrivalTime).toLocaleString() :'[DATE, TIME]'}
                                                    </li>
                                                </ul>
                                            </Col>
                                            
                                            {/* New Departing Flight Dialog */}
                                            <Dialog
                                                title="New Departing Flight"
                                                actions={departDialogActions}
                                                open={this.state.departDialogOpen}
                                                onRequestClose={this.handleDialogClose}
                                                autoScrollBodyContent={true}
                                            >
                                                <p className="highlight">{this.state.errorMessage}</p>
                                                    
                                                <Grid className="neg-margin">
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="airlineName"
                                                            hintText="Name of your airline..."
                                                            floatingLabelText="Airline Name"
                                                            type="text"
                                                            fullWidth={true}
                                                            onChange={event => {
                                                                this.setState({ airlineName: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="confirmation"
                                                            hintText="Confirmation Code"
                                                            floatingLabelText="Confirmation Code"
                                                            type="text"
                                                            fullWidth={true}
                                                            onChange={event => {
                                                                this.setState({ confirmation: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <Col className="no-padding" xs={12} sm={6}>
                                                            <DateTimePicker
                                                                className="date-input"
                                                                hintText="Departs"
                                                                fullWidth={true}
                                                                DatePicker={DatePickerDialog}
                                                                TimePicker={TimePickerDialog}
                                                                clearIcon={null}
                                                                onChange={date => {
                                                                    this.setState({ departTime: date.getTime() });
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col className="no-padding" xs={12} sm={6}>
                                                            <DateTimePicker
                                                                className="date-input"
                                                                hintText="Arrives"
                                                                fullWidth={true}
                                                                DatePicker={DatePickerDialog}
                                                                TimePicker={TimePickerDialog}
                                                                clearIcon={null}
                                                                onChange={date => {
                                                                    this.setState({ arrivalTime: date.getTime() });
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Grid>
                                            </Dialog>

                                            {/* Edit Departing Flight Dialog */}
                                            <Dialog
                                                title="Edit Departing Flight"
                                                actions={editDepartDialogActions}
                                                open={this.state.editDepartDialogOpen}
                                                onRequestClose={this.handleDialogClose}
                                                autoScrollBodyContent={true}
                                            >
                                                <p className="highlight">{this.state.errorMessage}</p>
                                                    
                                                <Grid className="neg-margin">
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="airlineName"
                                                            hintText="Name of your airline..."
                                                            floatingLabelText="Airline Name"
                                                            type="text"
                                                            fullWidth={true}
                                                            value={this.state.airlineName}
                                                            onChange={event => {
                                                                this.setState({ airlineName: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="confirmation"
                                                            hintText="Confirmation Code"
                                                            floatingLabelText="Confirmation Code"
                                                            type="text"
                                                            fullWidth={true}
                                                            value={this.state.confirmation}
                                                            onChange={event => {
                                                                this.setState({ confirmation: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <Col className="no-padding" xs={12} sm={6}>
                                                            <DateTimePicker
                                                                className="date-input"
                                                                hintText="Departs"
                                                                fullWidth={true}
                                                                DatePicker={DatePickerDialog}
                                                                TimePicker={TimePickerDialog}
                                                                value={new Date(this.state.departTime).toLocaleString()}
                                                                clearIcon={null}
                                                                onChange={date => {
                                                                    this.setState({ departTime: date.getTime() });
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col className="no-padding" xs={12} sm={6}>
                                                            <DateTimePicker
                                                                className="date-input"
                                                                hintText="Arrives"
                                                                fullWidth={true}
                                                                DatePicker={DatePickerDialog}
                                                                TimePicker={TimePickerDialog}
                                                                value={new Date(this.state.arrivalTime).toLocaleString()}
                                                                clearIcon={null}
                                                                onChange={date => {
                                                                    this.setState({ arrivalTime: date.getTime() });
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Grid>
                                            </Dialog>


                                            <Col xs={12} md={6} xl={4}>
                                                <h2 className="content-subheader header-border">Returning <span
                                                    className="overview-button"
                                                    onClick={() => {
                                                        this.state.dataRef.returning == null ? this.handleArriveDialogOpen()
                                                        : this.handleEditArriveDialogOpen()
                                                    }}
                                                ><FontAwesomeIcon className="fa-spacer" icon={faPencilAlt} />Edit</span></h2>
                                                <ul className="overview-list">
                                                    <li className="overview-li">Name: {this.state.dataRef.returning != null ? 
                                                        this.state.dataRef.returning.airlineName : '[AIRLINE]'}
                                                    </li>
                                                    <li className="overview-li">Confirmation Code: {this.state.dataRef.returning != null ? 
                                                        this.state.dataRef.returning.confirmation : '[CONFIRMATION CODE]'}
                                                    </li>
                                                    <li className="overview-li">Departs: {this.state.dataRef.returning != null ?
                                                        new Date(this.state.dataRef.returning.departTime).toLocaleString() : '[DATE, TIME]'}
                                                    </li>
                                                    <li className="overview-li">Arrives: {this.state.dataRef.returning != null ?
                                                        new Date(this.state.dataRef.returning.arrivalTime).toLocaleString() :'[DATE, TIME]'}
                                                    </li>
                                                </ul>
                                            </Col>

                                            {/* New Returning Flight Dialog */}
                                            <Dialog
                                                title="New Returning Flight"
                                                actions={arriveDialogActions}
                                                open={this.state.arriveDialogOpen}
                                                onRequestClose={this.handleDialogClose}
                                                autoScrollBodyContent={true}
                                            >
                                                <p className="highlight">{this.state.errorMessage}</p>
                                                    
                                                <Grid className="neg-margin">
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="airlineName"
                                                            hintText="Name of your airline..."
                                                            floatingLabelText="Airline Name"
                                                            type="text"
                                                            fullWidth={true}
                                                            onChange={event => {
                                                                this.setState({ airlineName: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="confirmation"
                                                            hintText="Confirmation Code"
                                                            floatingLabelText="Confirmation Code"
                                                            type="text"
                                                            fullWidth={true}
                                                            onChange={event => {
                                                                this.setState({ confirmation: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <Col className="no-padding" xs={12} sm={6}>
                                                            <DateTimePicker
                                                                className="date-input"
                                                                hintText="Departing"
                                                                fullWidth={true}
                                                                DatePicker={DatePickerDialog}
                                                                TimePicker={TimePickerDialog}
                                                                clearIcon={null}
                                                                onChange={date => {
                                                                    this.setState({ departTime: date.getTime() });
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col className="no-padding" xs={12} sm={6}>
                                                            <DateTimePicker
                                                                className="date-input"
                                                                hintText="Arrives"
                                                                fullWidth={true}
                                                                DatePicker={DatePickerDialog}
                                                                TimePicker={TimePickerDialog}
                                                                clearIcon={null}
                                                                onChange={date => {
                                                                    this.setState({ arrivalTime: date.getTime() });
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Grid>
                                            </Dialog>

                                            {/* Edit Returning Flights Dialog */}
                                            <Dialog
                                                title="Edit Returning Flight"
                                                actions={editArriveDialogActions}
                                                open={this.state.editArriveDialogOpen}
                                                onRequestClose={this.handleDialogClose}
                                                autoScrollBodyContent={true}
                                            >
                                                <p className="highlight">{this.state.errorMessage}</p>
                                                    
                                                <Grid className="neg-margin">
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="airlineName"
                                                            hintText="Name of your airline..."
                                                            floatingLabelText="Airline Name"
                                                            type="text"
                                                            fullWidth={true}
                                                            value={this.state.airlineName}
                                                            onChange={event => {
                                                                this.setState({ airlineName: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="confirmation"
                                                            hintText="Confirmation Code"
                                                            floatingLabelText="Confirmation Code"
                                                            type="text"
                                                            fullWidth={true}
                                                            value={this.state.confirmation}
                                                            onChange={event => {
                                                                this.setState({ confirmation: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <Col className="no-padding" xs={12} sm={6}>
                                                            <DateTimePicker
                                                                className="date-input"
                                                                hintText="Departing"
                                                                fullWidth={true}
                                                                DatePicker={DatePickerDialog}
                                                                TimePicker={TimePickerDialog}
                                                                value={new Date(this.state.departTime).toLocaleString()}
                                                                clearIcon={null}
                                                                onChange={date => {
                                                                    this.setState({ departTime: date.getTime() });
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col className="no-padding" xs={12} sm={6}>
                                                            <DateTimePicker
                                                                className="date-input"
                                                                hintText="Arrives"
                                                                fullWidth={true}
                                                                DatePicker={DatePickerDialog}
                                                                TimePicker={TimePickerDialog}
                                                                value={new Date(this.state.arrivalTime).toLocaleString()}
                                                                clearIcon={null}
                                                                onChange={date => {
                                                                    this.setState({ arrivalTime: date.getTime() });
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Grid>
                                            </Dialog>


                                            <Col xs={12} md={6} xl={4}>
                                                <h2 className="content-subheader header-border">Travelers <span
                                                    className="overview-button"
                                                    onClick={() => {
                                                        this.state.dataRef.travelers == null ? this.handleTravelersDialogOpen()
                                                        : this.handleEditTravelersDialogOpen()
                                                    }}
                                                ><FontAwesomeIcon className="fa-spacer" icon={faPencilAlt} />Edit</span></h2>
                                                <ul className="overview-list">
                                                    {this.state.dataRef.travelers != null ? 
                                                        Object.keys(this.state.dataRef.travelers).map((d, i) => {
                                                            return (
                                                                <li className="overview-li">{'Traveler ' + (i+1) + ': ' + this.state.dataRef.travelers[d]}</li>
                                                            );
                                                        }) 
                                                        : '[TRAVELERS]'
                                                    }
                                                </ul>
                                            </Col>

                                            {/* New Travelers Dialog */}
                                            <Dialog
                                                title="Edit Traveler's Name"
                                                actions={travelersDialogActions}
                                                open={this.state.travelersDialogOpen}
                                                onRequestClose={this.handleDialogClose}
                                                autoScrollBodyContent={true}
                                            >
                                                <p className="highlight">{this.state.errorMessage}</p>
                                                    
                                                <Grid className="neg-margin">
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="travelers"
                                                            hintText="Comma separated: Traveler 1, Traveler 2, etc..."
                                                            floatingLabelText="Traveler Name"
                                                            type="text"
                                                            fullWidth={true}
                                                            onChange={event => {
                                                                this.setState({ travelers: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                </Grid>
                                            </Dialog>

                                            {/* Editing Travelers Dialog */}
                                            <Dialog
                                                title="Traveler's Name"
                                                actions={editTravelersDialogActions}
                                                open={this.state.editTravelersDialogOpen}
                                                onRequestClose={this.handleDialogClose}
                                                autoScrollBodyContent={true}
                                            >
                                                <p className="highlight">{this.state.errorMessage}</p>
                                                    
                                                <Grid className="neg-margin">
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="travelers"
                                                            hintText="Comma separated: Traveler 1, Traveler 2, etc..."
                                                            floatingLabelText="Traveler Name"
                                                            type="text"
                                                            fullWidth={true}
                                                            value={this.state.travelers}
                                                            onChange={event => {
                                                                this.setState({ travelers: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                </Grid>
                                            </Dialog>

                                            <Col xs={12} md={6} xl={12}>
                                                <h2 className="content-subheader header-border">Notes <span
                                                    className="overview-button"
                                                    onClick={() => {
                                                        this.state.dataRef.notes == null ? this.handleNotesDialogOpen()
                                                        : this.handleEditNotesDialogOpen()
                                                    }}
                                                ><FontAwesomeIcon className="fa-spacer" icon={faPencilAlt} />Edit</span></h2>
                                                <p>{this.state.dataRef.notes != null ? this.state.dataRef.notes 
                                                    : 'Add any trip notes or details here.'}</p>
                                            </Col>

                                            {/* New Notes Dialog */}
                                            <Dialog
                                                title="New Trip Notes"
                                                actions={notesDialogActions}
                                                open={this.state.notesDialogOpen}
                                                onRequestClose={this.handleDialogClose}
                                                autoScrollBodyContent={true}
                                            >
                                                <p className="highlight">{this.state.errorMessage}</p>
                                                    
                                                <Grid className="neg-margin">
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="notes"
                                                            hintText="New Notes..."
                                                            floatingLabelText="Notes"
                                                            type="text"
                                                            fullWidth={true}
                                                            multiLine={true}
      rowsMax={5}
                                                            onChange={event => {
                                                                this.setState({ notes: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                </Grid>
                                            </Dialog>

                                            {/* Edit Notes Dialog */}
                                            <Dialog
                                                title="Edit Trip Notes"
                                                actions={editNotesDialogActions}
                                                open={this.state.editNotesDialogOpen}
                                                onRequestClose={this.handleDialogClose}
                                                autoScrollBodyContent={true}
                                            >
                                                <p className="highlight">{this.state.errorMessage}</p>
                                                    
                                                <Grid className="neg-margin">
                                                    <Row>
                                                        <TextField
                                                            className="auth-input"
                                                            name="notes"
                                                            hintText="New Notes..."
                                                            floatingLabelText="Notes"
                                                            type="text"
                                                            fullWidth={true}
                                                            value={this.state.notes}
                                                            onChange={event => {
                                                                this.setState({ notes: event.target.value });
                                                            }}
                                                        />
                                                    </Row>
                                                </Grid>
                                            </Dialog>
                                        </Row>
                                        <Row>
                                            <Col lgOffset={2} xlOffset={3} xs={12} lg={8} xl={6}>
                                            <RaisedButton
                                                className="delete-trip-button"
                                                label="Delete this Trip"
                                                fullWidth={true}
                                                secondary={true}
                                                onClick={() => {
                                                    this.handleDeleteTrip()
                                                }}
                                            />
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
