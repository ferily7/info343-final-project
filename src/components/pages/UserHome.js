import React, { Component } from 'react';
import Sidebar from '../sidebar-component/Sidebar';
import Navbar from '../navbar-component/Navbar';
import UserHomeContent from './UserHomeContent';

class UserHome extends Component {
    render() {
        return (
            <div>
                <Sidebar firebaseUser={this.props.firebaseUser} selectedTrip={this.props.selectedTrip} />
                <Navbar />
                <UserHomeContent firebaseUser={this.props.firebaseUser} selectedTrip={this.props.selectedTrip} />
            </div>
        )
    }
}

export default UserHome;