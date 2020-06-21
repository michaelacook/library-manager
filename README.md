# Library Manager Application
This is a simple CRUD application for managing book records. Project 8 Full Stack JavaScript.

## Built With
- Node.js
- [Express.js](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [Pug template engine](https://pugjs.org/api/getting-started.html)
- A dash of vanilla JavaScript

## Design 
This project implements the Model View Controller architectural design pattern. Though the Express framework does not force MVC, I have made software design decisions that strongly value the separation of concerns (as I find it cleaner and easier to keep track of everything as the project grows). You will not find any logic related either to database interaction or updating views within route handlers. Instead the following design scheme is used:

* Router handlers call methods on Controllers found in `./controllers`
* Controller classes encapsulate the logic of updating views with dynamic data called from `BookService` in `./Models`
* All Controllers extend the base `Controller` class for shared functionality
* The `BookService` class encapsulates the logic of interacting with Models. It's methods return dynamic data where appropriate
* `./middleware` contains middleware closures that are required and used in `app.js`
* `./utilities` contains modules that are not related to business logic or updating views directly but work as helper functions

## Extra Features 
In addition to the base project requirements this project also implements interactive flash messages, as well as a search feature and pagination.

## License 
- MIT
