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
                  Trip Planner is an application that allows the user to
                  interactively create a travel itinerary, see data about their
                  budget, and mark their reservations. The application can be
                  used by anyone who wants to plan and organize their trip. Alternatively, users can use
                  the application just for its budgeting and calendar features.
                </p>

                <p>
                  Users interactively create their
                  itinerary, adding events and optionally integrating them with
                  the budget and/or reservation features. The dashboard features four tabs: Overview, 
                  Itinerary, Budget, and Reservations. This allows users to keep their trip
                  organized and well-planned.
                </p>

                <h2>Itinerary</h2>
                <p>
                  The itinerary is a calendar that serves as a great tool to
                  plan out a schedule. Users 
                  can customize their calendar by adding events. Events require
                  a name and date/time range. Optionally, they can add an estimated cost and
                  a category, which will appear in the Budget tab. If the users indicate that
                  a reservation has been made, they can add additional details, including a location,
                  description, and picture. These details will render in the Reservations tab. Once created,
                  the event will appear on the calendar.
                </p>

                <h2>Budgeting</h2>
                <p>
                  With the Budget tab, the user is able to set a maximum budget
                  for the whole trip, but also having the ability to update
                  their budget whenever they like. Users are able to categorize
                  the items they bought during the trip and see how much money
                  they spent in a specific category. Some of the differeny
                  categories are dining, services, experiences, shopping and
                  uncategorized. However, the user is not limited to the given
                  categories and have the option to add or delete any
                  categories. On the top of Budget tab is a progress bar where
                  the user can see how much money has been used so far out of
                  the maximum budget and see the amount of money the user spent
                  in each category.
                </p>

                <h2>Reservations</h2>
                <p>
                  Finally in the Reservations tab, the user is able to see all
                  of their reservations made for events. Under each reservation
                  says when and where the reservation is and gives details about
                  it. With the Reservations, the user is able to see how many
                  reservations were made and the exact time of when it is. The
                  Reservations tab is a great way for the user to be reminded
                  when their reservation is and to not forget about it.
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
