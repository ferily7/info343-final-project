import React, { Component } from "react";
import Auth from "../../Auth";
class Homepage extends Component {
    render() {
        return (
            <div className="container">
                <h1>Welcome!</h1>
                <p>
                    This is the landing page.
        </p>
                <Auth />
            </div>
        );
    }
}

export default Homepage;
