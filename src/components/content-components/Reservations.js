import React, { Component } from 'react';
import firebase from 'firebase';


class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgReference: null
        }
    }
    componentDidMount() {
        this.mounted = true;
        if (this.props.firebaseUser && this.props.selectedTrip !== '') {
            this.orgReference = firebase.database().ref(`${this.props.firebaseUser.uid}/trips/${this.props.selectedTrip}`);
            this.orgReference.on('value', (snapshot) => {
                if (this.mounted) {
                    this.setState({ orgReference: snapshot.val() });
                }
            })
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    render() {
        return (

            <div>
                {this.props.selectedTrip === "" &&
                    <div>
                        Select a trip to begin
                    </div>
                }
                {this.props.selectedTrip !== "" &&
                    <div>Trip selected</div>
                }
            </div>


        )
    }
}

export default Reservations;