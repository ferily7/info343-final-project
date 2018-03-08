import React, { Component } from 'react';

class NoTrips extends Component {

    render() {
        return(
            <div className="contain-notrips">
            <div className="notrips">
                <p>You have no trips planned.</p>
                <p>Begin by adding a new trip.</p>
                </div>
            </div>
        );
    }
}

export default NoTrips;