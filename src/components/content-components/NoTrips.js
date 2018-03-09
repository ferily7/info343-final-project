import React, { Component } from 'react';

class NoTrips extends Component {

    render() {
        return (
            <div className="contain-notrips">
                <div className="notrips unselectable">
                    <p>No trip has been chosen.</p>
                    <p>Select or create a trip.</p>
                </div>
            </div>
        );
    }
}

export default NoTrips;