# Trip Planner
Created by Laura Freeman, Farrah Lee, Sangchul Hwang, and William Kwok for INFO 343 Winter 2018

## About our project
We have created an application that allows the user to interactively create a travel itinerary, see data about their budget, and mark their reservations. The clients of our web application will be tourists who want to plan a complex schedule for their trip, or just using the budgeting feature. Our application is focused towards end users that like to have control of every aspect of their schedule and have an interactive interface for planning.

Our application shares information about what the user has planned already, what their current estimated cost is versus their max budget (segmented by category). Users are able to interactively create their itinerary, similar to Google Calendar.

Our project is open source, and modules can be added for more features very easily using the React framework.

## Similar solutions
Google Calendar, Expedia Trip Planner, and other trip planners are similar applications.

Google Calendar is the most similar, but it is not specifically focused towards travel, and doesn't let the user add a lot of information that may be relevant to a trip.

Other trip planners have a lot of established architecture for place suggestions or reservation makers, but none we found had an intuitive interface, so we attempted to make a "best of both worlds" application, to create a Google Calendar with trip planning in mind.

## Modules used
* [classnames](https://www.npmjs.com/package/classnames) for conditionally joining classNames together for reactstrap `tabContent`.
* [firebase](https://www.npmjs.com/package/firebase) for authentication, data storage, and image storage.
* [lodash](https://www.npmjs.com/package/lodash) to sort arrays and objects throughout the project quickly.
* [material-ui-datetimepicker](https://www.npmjs.com/package/material-ui-datetimepicker) to combine material ui date picker and time picker together for creating calendar events
* [moment](https://www.npmjs.com/package/moment) used for localization with the Big Calendar on the Itinerary page
* [react-big-calendar](https://www.npmjs.com/package/react-big-calendar) used for a calendar interface with the Itinerary page

## Database structure

## Problems faced

## Future plans
