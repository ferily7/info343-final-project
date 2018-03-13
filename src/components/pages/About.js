import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";

class About extends Component {

    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col smOffset={1} xs={12} sm={10}>
                        <div className="contain-sm">
                            <h1 className="about-header">About</h1>
                            <p>
                                Trip Planner is an application that allows the user to interactively create a 
                                travel itinerary, see data about their budget, and mark their reservations. The 
                                application can be used by tourists who want to plan a schedule for their trip or 
                                vacation, keeping it structured and organized. The users can also use the application 
                                solely for budgeting their money or a structured calendar.
                            </p>
                                
                            <p>
                                The application shares information about what the user has planned already, what 
                                their current estimated cost is versus their max budget. Users are able to 
                                interactively create their itinerary, adding events at any specific time. Users have a 
                                dashboard with four different tabs: a Overview tab, a Itinerary tab, a Budget tab, and a
                                Reservations tab. With the dashboard, the users are able to stay organized with their trip. 
                                The applicaton is a great way to keep your trip organized, neat and planned out
                            </p>
                            
                            <h2>Itinerary</h2>
                            <p>
                                The itinerary is a calendar that serves as a great tool to plan out your schedule in 
                                details by creating events. The users are able to customize their calendar by adding events 
                                they plan to do on a specific day and time. When users creates an event, they have to provide 
                                a few details: name, location description, estimated cost, and if a reservation was made. 
                                If the user says that a reservation was made, the event will also appear on the Reservation 
                                tab. Also the given estimated cost will appear on the Budgeting tab so that the user is aware of 
                                how much money he or she is spending on a specific event. It is convenient using the Itinerary tab 
                                since you are able to see all of the events you created throughout the trip.
                            </p>
                                
                            <h2>Budgeting</h2>
                            <p>With the Budget tab, the user is able to set a maximum budget for the whole trip, but also 
                                having the ability to update their budget whenever they like. Users are able to categorize 
                                the items they bought during the trip and see how much money they spent in a specific category. 
                                Some of the differeny categories are dining, services, experiences, shopping and uncategorized. 
                                However, the user is not limited to the given categories and have the option to add or delete any 
                                categories. On the top of Budget tab is a progress bar where the user can see how much money has been 
                                used so far out of the maximum budget and see the amount of money the user spent in each category.
                            </p>

                            <h2>Reservations</h2>
                            <p>Finally in the Reservations tab, the user is able to see all of their reservations made for events. Under 
                                each reservation says when and where the reservation is and gives details about it. With the Reservations, 
                                the user is able to see how many reservations were made and the exact time of when it is. The 
                                Reservations tab is a great way for the user to be reminded when their reservation is and to not forget 
                                about it.
                            </p>

                        </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default About;