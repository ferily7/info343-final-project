import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";

class About extends Component {

    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col smOffset={1} xs={12} sm={10}>
                        <div className="contain-sm">
                            <h1 className="page-header">About</h1>

                            <h2>Itinerary</h2>
                            <p>Information about how the itinerary works goes here</p>
                                
                            <h2>Budgeting</h2>
                            <p>Information about how budgeting works goes here</p>

                            <h2>Reservations</h2>
                            <p>Information about how reservations work goes here</p>

                        </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default About;