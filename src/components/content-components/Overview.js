import React, { Component } from 'react';
import firebase from 'firebase';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgReference: null
        }
    }
    componentWillReceiveProps(inProp) {
        this.orgReference = firebase.database().ref(`${inProp.firebaseUser.uid}/trips/${inProp.selectedTrip}`);
        this.orgReference.on('value', (snapshot) => {
            if (this.mounted) {
                this.setState({ orgReference: snapshot.val() });
            }
        })
    }
    componentDidMount() {
        this.mounted = true;
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
                {this.props.selectedTrip !== "" && this.state.orgReference &&
                    <div>{this.state.orgReference.tripName}{console.log(this.state.orgReference)}</div>
                }
            </div>


        )
    }
}

export default Overview;