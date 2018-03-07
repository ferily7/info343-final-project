import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };

    this.tabList = ["Overview", "Itinerary", "Budget", "Reservations"];
    this.toggle = this.toggle.bind(this);
  }

  // toggle sets the current active tab displayed for the navigation bar
  // @param   tab     tab is an integer
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="dashboard-tabs">
        <Nav tabs>
          {/* This maps different tabs and sets the corresponding routes. Routes are the lower case version of what is the tab's name */
          this.tabList.map((d, i) => {
            return (
              <NavItem key={"navbaritem" + i}>
                {this.state.activeTab === i && (
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === i
                    })}
                    onClick={() => {
                      this.toggle(i);
                    }}
                  >
                    {d}
                  </NavLink>
                )}
                {/* When not active, it just displays as a link currently, not a NavLink like when it is active. I encountered errors when trying to wrap a
                                        NavLink with a Link, even though the NavLink was from reactstrap, and Link was from React-Router-Dom*/}
                {this.state.activeTab !== i && (
                  <Link
                    to={`/userhome/${d.toLowerCase()}`}
                    className={classnames({
                      active: this.state.activeTab === i
                    })}
                    onClick={() => {
                      this.toggle(i);
                    }}
                  >
                    {d}
                  </Link>
                )}
              </NavItem>
            );
          })}
        </Nav>
      </div>
    );
  }
}

export default Navbar;
