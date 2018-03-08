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
              <p>
                  This is the about/attributions page.
                  </p>
                  </div>
              </Col>
              </Row>
              </Grid>
                </div>
        );
    }
}

export default About;