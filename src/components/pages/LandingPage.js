import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import SignUp from "../../Auth";
import RaisedButton from "material-ui/RaisedButton";

class LandingPage extends Component {
    render() {
        return (
            <div className="contain">
            <div className="contain-sm">
                <Grid fluid>
                    <Row className="landing-content">
                    
                        <Col className="landing-offset" mdOffset={1} xs={12} md={5}>
                            <div className="contain-intro">
                                <h1 id="welcome-header">Welcome</h1>
                                <h2 id="welcome-subheader">to the best trip planner on the market</h2>
                                <p id="welcome-blurb">
                                    Having trouble planning your next vacation? Trip planner is here for you!
                                    With Trip Planner, you can manage all your trips in one place, keep track
                                    of your budget, and organize all of your events and reservations. Get started
                                    planning your stress-free vacation right here -- right now. You deserve it.
                                    </p>
                                <Link to="/about">
                                <RaisedButton
                                    className="about-button"
                                    primary={true}
                                    label="Learn More"
                                />
                                </Link>
                            </div>
                        </Col>
                        <Col xs={12} md={5}>
                            <div>
                                {this.props.firebaseUser !== null && (
                                    <Redirect to="/userhome/overview" />
                                )}
                                <div className="contain-signup-outer">
                                    <div className="contain-signup">
                                        <SignUp />
                                    </div>
                                    Already have an account? {" "}
                                    <Link to="/login">
                                        <span id="signin-link" href="/">Sign in.</span>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
                </div>
            </div>
        );
    }
}

export default LandingPage;
