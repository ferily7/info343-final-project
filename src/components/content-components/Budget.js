import React, { Component } from "react";
import firebase from "firebase";
import { Grid, Row, Col } from "react-flexbox-grid";
import NoTrips from "./NoTrips";
// material ui components
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class Budget extends Component {
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
        if (this.mounted) {
          this.setState({ dataRef: snapshot.val() });
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
                <Row>budget bar</Row>
                <Row>
                  <Col xs={12} sm={8} md={5}>
                  <TextField
                                            className="auth-input"
                                            name="item"
                                            hintText="What did you buy?"
                                            floatingLabelText="Item"
                                            type="text"
                                            fullWidth={true}
                                        />
                  </Col>
                  <Col xs={3} sm={4} md={2}>
                    
                    <TextField
                                            className="auth-input"
                                            name="amount"
                                            hintText="$0.00"
                                            floatingLabelText="Cost"
                                            type="number"
                                            fullWidth={true}
                                        />
                  </Col>
                  <Col xs={5} sm={7} md={3}>
                    
                    <TextField
                                            className="auth-input"
                                            name="category"
                                            hintText="Where are you going?"
                                            floatingLabelText="Destination"
                                            type="text"
                                            fullWidth={true}
                                        />
                  </Col>
                  <Col xs={4} sm={5} md={2}>
                    
                    <RaisedButton
                    className="addexpense-button"
                    fullWidth={true}
                label="Add"
                primary={true}
                onClick={console.log("Add expense button clicked")}
            />
                  </Col>
                </Row>
                <Row>
                  {/*Category 1*/}
                  <Col xs={12} md={6} xl={4}>
                    <p>[CATEGORY NAME]</p>
                    <table>
                      <tr>
                        <td>item 1</td>
                        <td>$0.00</td>
                      </tr>
                      <tr>
                        <td>item 2</td>
                        <td>$0.00</td>
                      </tr>
                      <tr>
                        <td>item 3</td>
                        <td>$0.00</td>
                      </tr>
                    </table>
                  </Col>
                  {/*Category 2*/}
                  <Col xs={12} md={6} xl={4}>
                    <p>[CATEGORY NAME]</p>
                    <table>
                      <tr>
                        <td>item 1</td>
                        <td>$0.00</td>
                      </tr>
                      <tr>
                        <td>item 2</td>
                        <td>$0.00</td>
                      </tr>
                      <tr>
                        <td>item 3</td>
                        <td>$0.00</td>
                      </tr>
                    </table>
                  </Col>
                  {/*Category 3*/}
                  <Col xs={12} md={6} xl={4}>
                    <p>[CATEGORY NAME]</p>
                    <table>
                      <tr>
                        <td>item 1</td>
                        <td>$0.00</td>
                      </tr>
                      <tr>
                        <td>item 2</td>
                        <td>$0.00</td>
                      </tr>
                      <tr>
                        <td>item 3</td>
                        <td>$0.00</td>
                      </tr>
                    </table>
                  </Col>
                  
                </Row>
              </Grid>
            </div>
          )}
      </div>
    );
  }
}

export default Budget;
