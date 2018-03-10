import React, { Component } from "react";
import firebase from "firebase";
import { Grid, Row, Col } from "react-flexbox-grid";
import NoTrips from "./NoTrips";
import { Progress } from "reactstrap";
import "react-sweet-progress/lib/style.css";
// material ui components
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    TableFooter
} from "material-ui/Table";

import Dialog from "material-ui/Dialog";

class Budget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRef: null,
            value: "",
            dialogOpen: false,
            categoryToAdd: '',
            errorMessage: '',
            buyItem: '',
            costItem: 0
        };
    }
    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    };

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false,
            categoryToAdd: '',
            errorMessage: ''
        });
    };
    handleDialogSubmit = () => {
        if (this.state.categoryToAdd !== '') {
            let categories = this.state.dataRef.categories;
            categories.push(this.state.categoryToAdd);
            this.dataRef.child("categories").set(categories);
            this.setState({
                dialogOpen: false,
                categoryToAdd: ''
            });
        } else {
            this.setState({ errorMessage: "Invalid category name" });
        }
    };

    addExpense = () => {
        if (this.state.buyItem !== "" && this.state.value !== "") {
            let pushObj = {
                eventName: this.state.buyItem,
                cost: this.state.costItem,
                type: this.state.value
            };
            this.dataRef.child("purchases").push(pushObj);
            this.setState({
                buyItem: '',
                costItem: 0,
                value: ''
            })
        } else {
            this.setState({ errorMessage: "Invalid input!" })
        }
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
    handleChange = (event, index, value) => this.setState({ value });
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
                {this.props.selectedTrip === "" && <NoTrips />}
                {this.props.selectedTrip !== "" &&
                    this.state.dataRef && (
                        <div>
                            <Grid>
                                <Row>
                                    <div className="contain-progress">
                                        <div className="text-center">
                                            [AMOUNT] of [BUDGET] spent
                    </div>
                                        <Progress multi>
                                            <Progress
                                                bar
                                                className="category-1 progress-bar-text unselectable"
                                                value="10"
                                            >
                                                category-1
                      </Progress>
                                            <Progress
                                                bar
                                                className="category-2 progress-bar-text unselectable"
                                                value="10"
                                            >
                                                category-2
                      </Progress>
                                            <Progress
                                                bar
                                                className="category-3 progress-bar-text unselectable"
                                                value="10"
                                            >
                                                category-3
                      </Progress>
                                            <Progress
                                                bar
                                                className="category-4 progress-bar-text unselectable"
                                                value="10"
                                            >
                                                category-4
                      </Progress>
                                            <Progress
                                                bar
                                                className="category-5 progress-bar-text unselectable"
                                                value="10"
                                            >
                                                category-5
                      </Progress>
                                            <Progress
                                                bar
                                                className="category-6 progress-bar-text unselectable"
                                                value="10"
                                            >
                                                category-6
                      </Progress>
                                            <Progress
                                                bar
                                                className="category-7 progress-bar-text unselectable"
                                                value="10"
                                            >
                                                category-7
                      </Progress>
                                            <Progress
                                                bar
                                                className="category-8 progress-bar-text unselectable"
                                                value="10"
                                            >
                                                category-8
                      </Progress>
                                        </Progress>
                                    </div>
                                </Row>
                                <Row>
                                    <Col className="no-padding" xs={12} sm={8} md={5}>
                                        <TextField
                                            className="auth-input"
                                            name="item"
                                            hintText="What did you buy?"
                                            floatingLabelText="Item"
                                            type="text"
                                            fullWidth={true}
                                            value={this.state.buyItem}
                                            onChange={(e) => this.setState({ buyItem: e.target.value })}
                                        />
                                    </Col>
                                    <Col className="no-padding" xs={3} sm={4} md={2}>
                                        <TextField
                                            className="auth-input input-padding"
                                            name="amount"
                                            hintText="0.00"
                                            floatingLabelText="Cost"
                                            type="number"
                                            fullWidth={true}
                                            value={this.state.costItem}
                                            onChange={(e) => this.setState({ costItem: Number(e.target.value) })}
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
                                            <MenuItem value="" primaryText="" />
                                            {
                                                this.state.dataRef.categories.map((d, i) => {
                                                    return (<MenuItem key={d} value={d} primaryText={d} />);
                                                })
                                            }
                                        </SelectField>
                                    </Col>
                                    <Col className="no-padding" xs={4} sm={5} md={2}>
                                        <RaisedButton
                                            className="addexpense-button"
                                            fullWidth={true}
                                            label="Add"
                                            primary={true}
                                            onClick={() => this.addExpense()}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    {/*Category 1*/}
                                    <Col className="table-margin" xs={12} md={6} xl={4}>
                                        <h2 className="content-subheader">Category 1</h2>
                                        <div className="category-table">
                                            <Table
                                                selectable={false}
                                                fixedFooter={true}
                                                height="200px"
                                            >
                                                <TableBody
                                                    showRowHover={true}
                                                    displayRowCheckbox={false}
                                                >
                                                    <TableRow>
                                                        <TableRowColumn>Item 1</TableRowColumn>
                                                        <TableRowColumn>$0.00</TableRowColumn>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableRowColumn>Item 2</TableRowColumn>
                                                        <TableRowColumn>$0.00</TableRowColumn>
                                                    </TableRow>
                                                </TableBody>
                                                <TableFooter className="table-footer">
                                                    <TableRow>
                                                        <TableRowColumn>
                                                            <span className="bold">Total:</span>
                                                        </TableRowColumn>
                                                        <TableRowColumn>
                                                            <span className="bold">[TOTAL]</span>
                                                        </TableRowColumn>
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>
                                        </div>
                                    </Col>

                                    {/*Category 2*/}
                                    <Col className="table-margin" xs={12} md={6} xl={4}>
                                        <h2 className="content-subheader">Category 2</h2>
                                        <div className="category-table">
                                            <Table selectable={false}>
                                                <TableBody
                                                    showRowHover={true}
                                                    displayRowCheckbox={false}
                                                >
                                                    <TableRow>
                                                        <TableRowColumn>Item 1</TableRowColumn>
                                                        <TableRowColumn>$0.00</TableRowColumn>
                                                    </TableRow>
                                                </TableBody>
                                                <TableFooter className="table-footer">
                                                    <TableRow>
                                                        <TableRowColumn>
                                                            <span className="bold">Total:</span>
                                                        </TableRowColumn>
                                                        <TableRowColumn>
                                                            <span className="bold">[TOTAL]</span>
                                                        </TableRowColumn>
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>
                                        </div>
                                    </Col>

                                    {/*Category 3*/}
                                    <Col className="table-margin" xs={12} md={6} xl={4}>
                                        <h2 className="content-subheader">Category 3</h2>
                                        <div className="category-table">
                                            <Table selectable={false}>
                                                <TableBody
                                                    showRowHover={true}
                                                    displayRowCheckbox={false}
                                                >
                                                    <TableRow>
                                                        <TableRowColumn>Item 1</TableRowColumn>
                                                        <TableRowColumn>$0.00</TableRowColumn>
                                                    </TableRow>
                                                </TableBody>
                                                <TableFooter className="table-footer">
                                                    <TableRow>
                                                        <TableRowColumn>
                                                            <span className="bold">Total:</span>
                                                        </TableRowColumn>
                                                        <TableRowColumn>
                                                            <span className="bold">[TOTAL]</span>
                                                        </TableRowColumn>
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>
                                        </div>
                                    </Col>

                                    {/*Add new category*/}
                                    {this.state.dataRef.categories.length < 8 &&
                                        <Col className="table-margin" xs={12} md={6} xl={4}>
                                            <div
                                                className="new-category"
                                                onClick={() => {
                                                    this.handleDialogOpen();
                                                }}
                                            >
                                                <p className="unselectable new-category-text">
                                                    + add category
                                            </p>
                                            </div>
                                        </Col>
                                    }
                                </Row>
                            </Grid>

                            <Dialog
                                title="Add Category"
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
                                            name="categoryToAdd"
                                            hintText="Name your category"
                                            floatingLabelText="Category name"
                                            type="text"
                                            fullWidth={true}
                                            onChange={(event) => { this.setState({ categoryToAdd: event.target.value }) }}
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

export default Budget;
