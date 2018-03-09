import React, { Component } from 'react';

class NoTrips extends Component {

    render() {
        return (
            <div className="contain-notrips">
                <div className="notrips unselectable">
                    <p>No trips have been chosen.</p>
                    <p>Begin by choosing an existing trip, or by creating a new one.</p>
                </div>
            </div>
        );
    }
}

export default NoTrips;