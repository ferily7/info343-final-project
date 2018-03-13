import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";

// material ui components
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem, makeSelectable } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });
    };

    render() {
      const selectedItemStyle = {
        backgroundColor: "#f75830",
        color: '#ffffff',
        margin: '-1px'
      };
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
          selectedItemStyle={selectedItemStyle}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}
SelectableList = wrapState(SelectableList);

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      dataRef: null,
      dialogOpen: false,
      tripName: "",
      origin: "",
      destination: "",
      dateStart: 0,
      dateEnd: 0,
      travelerCount: 0,
      budget: 0
    };
  }
  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
      errorMessage: null
    });
  };
  handleDialogSubmit = () => {
    if (this.state.tripName === "") {
      this.setState({ errorMessage: "Trip name cannot be empty" });
    } else if (this.state.origin === "") {
      this.setState({ errorMessage: "Origin cannot be empty" });
    } else if (this.state.destination === "") {
      this.setState({ errorMessage: "Destination cannot be empty" });
    } else if (
      this.state.dateStart === 0 ||
      this.state.dateEnd === 0 ||
      this.state.dateStart > this.state.dateEnd
    ) {
      this.setState({ errorMessage: "Invalid dates chosen" });
    } else if (this.state.travelerCount === 0) {
      this.setState({ errorMessage: "Invalid number of travelers" });
    } else if (this.state.budget <= 0) {
      this.setState({ errorMessage: "Invalid maximum budget" });
    } else {
      let pushObj = {
        dateEnd: this.state.dateEnd,
        dateStart: this.state.dateStart,
        startLocation: this.state.origin,
        endLocation: this.state.destination,
        numTravelers: this.state.travelerCount,
        budget: this.state.budget,
        tripName: this.state.tripName,
        categories: [
          "Dining",
          "Services",
          "Experiences",
          "Shopping",
          "Uncategorized"
        ]
      };
      this.dataRef.push(pushObj);
      this.setState({
        dialogOpen: false,
        tripName: "",
        origin: "",
        destination: "",
        dateStart: 0,
        dateEnd: 0,
        travelerCount: 0,
        budget: 0
      });
    }
  };
  handleSignOut() {
    this.props.changeSelectedTrip("");
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
      this.dataRef = firebase
        .database()
        .ref(`${this.props.firebaseUser.uid}/trips`);
      this.dataRef.on("value", snapshot => {
        if (this.mounted) {
          this.setState({ dataRef: snapshot.val() });
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
            <h2 className="trips-header">Your Trips</h2>
            <div className="trip-list">
            {/* need default value to be the currently selected trip */}
              <SelectableList defaultValue={0}>
                {this.state.dataRef &&
                  Object.keys(this.state.dataRef).map((d, i) => {
                    return (
                      <ListItem
                        className="trip-list-item unselectable"
                        key={d}
                        value={i}
                        primaryText={this.state.dataRef[d].tripName}
                        onClick={() => this.props.changeSelectedTrip(d)}
                      />
                    );
                  })}
                <ListItem
                  id="new-trip"
                  className="trip-list-item unselectable"
                  primaryText="+ New"
                  onClick={this.handleDialogOpen}
                />
              </SelectableList>
            </div>
            <FlatButton
                        backgroundColor='#c4c4c4'
                        hoverColor="#f75830"
              className="signout-button"
              label="Sign Out"
              onClick={() => this.handleSignOut()}
            />

            <Dialog
              title="Plan a New Trip"
              actions={dialogActions}
              open={this.state.dialogOpen}
              onRequestClose={this.handleDialogClose}
              autoScrollBodyContent={true}
            >
              <p className="highlight">{this.state.errorMessage}</p>
              <Grid className="neg-margin">
                <Row>
                  <TextField
                    className="auth-input"
                    name="tripName"
                    hintText="Name your trip..."
                    floatingLabelText="Trip Name"
                    type="text"
                    fullWidth={true}
                    onChange={event => {
                      this.setState({ tripName: event.target.value });
                    }}
                  />
                </Row>
                <Row>
                  <Col className="no-padding" xs={12} sm={6}>
                    <TextField
                      className="auth-input"
                      name="origin"
                      hintText="Where are you coming from?"
                      floatingLabelText="Origin"
                      type="text"
                      fullWidth={true}
                      onChange={event => {
                        this.setState({ origin: event.target.value });
                      }}
                    />
                  </Col>
                  <Col className="no-padding" xs={12} sm={6}>
                    <TextField
                      className="auth-input"
                      name="destination"
                      hintText="Where are you going?"
                      floatingLabelText="Destination"
                      type="text"
                      fullWidth={true}
                      onChange={event => {
                        this.setState({ destination: event.target.value });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="no-padding" xs={12} sm={6}>
                    {/* See http://www.material-ui.com/#/components/date-picker set min/max date */}
                    <DatePicker
                      className="date-input"
                      hintText="From"
                      fullWidth={true}
                      onChange={(n, date) => {
                        this.setState({ dateStart: date.getTime() });
                      }}
                    />
                  </Col>
                  <Col className="no-padding" xs={12} sm={6}>
                    <DatePicker
                      className="date-input"
                      hintText="Until"
                      fullWidth={true}
                      onChange={(n, date) => {
                        this.setState({ dateEnd: date.getTime() });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <TextField
                    className="auth-input"
                    name="travelerCount"
                    hintText="How many travelers?"
                    floatingLabelText="Travelers"
                    type="number"
                    fullWidth={true}
                    onChange={event => {
                      this.setState({
                        travelerCount: Number(event.target.value)
                      });
                    }}
                  />
                </Row>
                <Row>
                  <TextField
                    className="auth-input"
                    name="budget"
                    hintText="What is your budget?"
                    floatingLabelText="Budget"
                    type="number"
                    fullWidth={true}
                    onChange={event => {
                      this.setState({ budget: Number(event.target.value) });
                    }}
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
