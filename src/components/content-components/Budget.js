import React, { Component } from "react";
import firebase from "firebase";
import { Grid, Row, Col } from "react-flexbox-grid";
import NoTrips from "./NoTrips";
// material ui components
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRef: null,
      value: null
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
  handleChange = (event, index, value) => this.setState({ value });
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
                  <Col className="no-padding" xs={12} sm={8} md={5}>
                    <TextField
                      className="auth-input"
                      name="item"
                      hintText="What did you buy?"
                      floatingLabelText="Item"
                      type="text"
                      fullWidth={true}
                    />
                  </Col>
                  <Col className="no-padding" xs={3} sm={4} md={2}>
                    <TextField
                      className="auth-input input-padding"
                      name="amount"
                      hintText="$0.00"
                      floatingLabelText="Cost"
                      type="number"
                      fullWidth={true}
                    />
                  </Col>
                  <Col className="no-padding" xs={5} sm={7} md={3}>
                    <SelectField
                    className="auth-input"
                      floatingLabelText="Category"
                      value={this.state.value}
                      onChange={this.handleChange}
                      fullWidth={true}
                    >
                      <MenuItem value={1} primaryText="Category 1" />
                      <MenuItem value={2} primaryText="Category 2" />
                      <MenuItem value={3} primaryText="Category 3" />
                      <MenuItem value={4} primaryText="Category 4" />
                      <MenuItem value={5} primaryText="Category 5" />
                    </SelectField>
                  </Col>
                  <Col className="no-padding" xs={4} sm={5} md={2}>
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
                  <Col className="no-padding" xs={12} md={6} xl={4}>
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
                  <Col className="no-padding" xs={12} md={6} xl={4}>
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
                  <Col className="no-padding" xs={12} md={6} xl={4}>
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
