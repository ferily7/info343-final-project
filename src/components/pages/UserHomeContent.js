import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Overview from '../content-components/Overview';
import Itinerary from '../content-components/Itinerary';
import Budget from '../content-components/Budget';
import Reservations from '../content-components/Reservations';

class UserHomeContent extends Component {
    render() {
        return (
            <div>
                <Route exact path="/userhome/overview" render={(routerProps) => (<Overview {...routerProps} firebaseUser={this.props.firebaseUser} selectedTrip={this.props.selectedTrip} />)} />
                <Route exact path="/userhome/itinerary" render={(routerProps) => (<Itinerary {...routerProps} firebaseUser={this.props.firebaseUser} selectedTrip={this.props.selectedTrip} />)} />
                <Route exact path="/userhome/budget" render={(routerProps) => (<Budget {...routerProps} firebaseUser={this.props.firebaseUser} selectedTrip={this.props.selectedTrip} />)} />
                <Route exact path="/userhome/reservations" render={(routerProps) => (<Reservations {...routerProps} firebaseUser={this.props.firebaseUser} selectedTrip={this.props.selectedTrip} />)} />
            </div>
        )
    }
}

export default UserHomeContent;