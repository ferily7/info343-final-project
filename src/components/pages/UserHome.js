import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import Sidebar from "../sidebar-component/Sidebar";
import Navbar from "../navbar-component/Navbar";
import UserHomeContent from "./UserHomeContent";

class UserHome extends Component {
    render() {
        return (
            <Grid fluid className="translate-up no-padding no-margin">
                <Row className="tabs-row no-padding no-margin">
                    <Col
                        className="no-padding"
                        smOffset={4}
                        mdOffset={3}
                        lgOffset={2}
                        xs={12}
                        sm={8}
                        md={9}
                        lg={10}
                    >
                        <Navbar />
                    </Col>
                </Row>
                <Row className="no-padding no-margin">
                    <Col className="no-padding" xs={12} sm={4} md={3} lg={2}>
                        <Sidebar
                            firebaseUser={this.props.firebaseUser}
                            selectedTrip={this.props.selectedTrip}
                            changeSelectedTrip={this.props.changeSelectedTrip}
                        />
                    </Col>
                    <Col className="no-padding" xs={12} sm={8} md={9} lg={10}>
                        <UserHomeContent
                            firebaseUser={this.props.firebaseUser}
                            selectedTrip={this.props.selectedTrip}

                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default UserHome;
