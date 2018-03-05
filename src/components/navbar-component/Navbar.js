import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        };

        this.tabList = ['Overview', 'Itinerary', 'Reservations', 'Budget'];
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <Nav tabs>
                    {
                        this.tabList.map((d, i) => {
                            return (
                                <NavItem key={"navbaritem" + i}>
                                    {this.state.activeTab === `${i + 1}` &&
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === `${i + 1}` })}
                                            onClick={() => { this.toggle(`${i + 1}`); }} >
                                            {d}
                                        </NavLink>
                                    }

                                    {this.state.activeTab !== `${i + 1}` &&
                                        <Link to={`/userhome/${d.toLowerCase()}`}

                                            className={classnames({ active: this.state.activeTab === `${i + 1}` })}
                                            onClick={() => { this.toggle(`${i + 1}`); }} >
                                            {d}
                                        </Link>
                                    }
                                </NavItem>
                            )
                        })
                    }
                </Nav>
            </div>
        )
    }
}

export default Navbar;