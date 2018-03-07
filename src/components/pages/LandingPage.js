import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import SignUp from "../../Auth";
import RaisedButton from "material-ui/RaisedButton";

class LandingPage extends Component {
    render() {
        return (
            <div className="contain">
                <Grid fluid>
                    <Row className="landing-content">
                        <Col className="landing-offset" mdOffset={1} xs={12} md={5}>
                            <div className="contain-intro">
                                <h1 id="welcome-header">Welcome</h1>
                                <h2 id="welcome-subheader">
                                    to the best trip planner on the market
              </h2>
                                <p id="welcome-blurb">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                                    pulvinar urna ac nisl pulvinar dapibus. Suspendisse eu varius
                                    ante. In porta pharetra sem, sit amet vehicula eros fermentum
                                    ac. Donec finibus dolor vel maximus tincidunt. Donec nulla mi,
                                    ultricies ut est sit amet, efficitur faucibus odio.
              </p>
                                <RaisedButton
                                    className="about-button"
                                    primary={true}
                                    onClick={() =>
                                        console.log("Learn more button was clicked")
                                    }
                                    label="Learn More"
                                />
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
        );
    }
}

export default LandingPage;
