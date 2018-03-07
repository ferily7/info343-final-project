import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

// material ui components
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

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
      <FlatButton label="Cancel" primary={true} onClick={this.handleDialogClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDialogSubmit}
      />
    ];
    return (
      <div>
        {this.props.firebaseUser ? undefined : <Redirect to="/" />}
        <div className="sidebar">
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
            title="Dialog With Actions"
            actions={dialogActions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogClose}
          >
            The actions in this window were passed in as an array of React
            objects.
          </Dialog>
        </div>
      </div>
    );
  }
}



export default Sidebar;
