# Get started

1. Create a fork of this project
2. Clone your fork into your local machine.
3. Add an `upstream` remote pointing to the main CYF repo (to be able to pull updates from your team members)

After cloning the project, we will create the local database that the project will use.

## Database

- Open the terminal, and `cd` into `server`
- Create your database: `createdb final_project`
- `npm run recreate-db:local` (this will create and populate your new team's DB with the data your colleague added)

> Your actual database schema will go to `server/db/recreate-schema.sql` and you can add sample test data in  `server/db/populate-db.sql`

## Test it all works

Now let us test that the whole stack works (the `React frontend` connects to the `Node API` which connects to the `Postgres Database` )

- Open a terminal, navigate  to the root of the project and do `npm install`
- `cd` into `server` and run `npm run dev`
- On a different terminal, `cd` into `client` and run `npm run dev`

Once the React website opens in a browser. Navigate to the _Status_ page, and you should see two users listed in the page. This means everything works fine.

# Development Process
Read the [Development process](CONTRIBUTING.md).

> IMPORTANT: Make sure you read and understand the development proces guidelines before starting any work. Ask mentors for explanation if you have any questions.

# Project structure

The project is divided into `client` folder for the React frontend, and a `server` folder for the node API and database side.

> This structure is called a mono repo. As opposed to having two repos (one for client, another for server), we opted for a `monorepo`. You can read more about [monorepos](https://gomonorepo.org/).

## The Client

The client is a React app created with [create-react-app](https://create-react-app.dev/). In addition to the default setup, we have added [React Router](https://reacttraining.com/react-router/) with 3 routes for testing

- The `components` live in the `components` folder. When the project gets bigger, we might separate them into logical folders (i.e. `components/admin` for admin-related components, and `components/profile` for user profile-related components)

- The `api` folder contains modules to call a specific API, i.e. when you add a new endpoint to list, craete and update _jobs_ then you can add a new module called `api/jobs.js` that can contain methods such as `getJobs, createJob, deleteJob ...`.

- The tests live with the modules. Some projects put the tests in a top-level folder `__tests` but we chose that they live with the components they test, i.e. a test for `About.js` will be in a file called `About.test.js` at the same level in the folder.

- Styles are in the folder `client/styles`. Each file in that folder will contain styles related to a specific component (and have the same name), i.e. a component called `About.js` might define styles in `styles/About.css` and import them.

### Component library

We will use [Semantic UI](https://react.semantic-ui.com/) component library for the projects. Check out the documentation to get familiar with it.

## Server

The API is implemented using [Express](https://expressjs.com/) framework. We have added some extra functionality, such as a simple authentication solution.

- `db` folder contains the script to run to create the database, the schema and seed it with sample data. Whenever you want to add a new database table or change an existing, you will likely change it in `db/recreate-schema.sql`.

- `services` folder contain `database` services. These are modules to manipulate a certain entity in the database. For example, if you have a table called `documents`, you might add a module `services/database/documents` that will expose methods like `addDocument, getDocumentById` and implement an `SQL` statement to perform the required functionality.

- `api` When you add a new API, for example for managing `questions`. You can add it at `api/index.js`. This will define the _prefix_ so for example, 

```js
const questions = require('./questions');
router.use('/questions', questions);
```

and in `questions` module you will define the routes. Note these will all be prefixed with _questions_.

For example

```js
// questions.js
const express = require('express');
const router = express.Router();

// This route is GET /questions/ (because everything in this file is "mounted" on the prefix questions from the previous step)
router.get('/', (req, res) => {
    res.send('All good')
});

module.exports = router;
```

This structure using `Express.Router` allows our code to be _modular_ and minimise conflict between team members. You can read more about [Express Router](expressjs.com/en/guide/routing.html#express-router)

> Typically a server-side user story will involve:
> 1. Define a table in `db/recreate-schema.sql`
> 2. Create an API endpoint `api/some_table.js`
> 3. Create a service under `services/databases/some_table.js` (this will contain the SQL to connect the API and the database)


## Authentication and Authorisation

The project has routes and services to implement an authentication / authorisation solution. It depends on [passportjs](http://www.passportjs.org/) library, and implements an authentication strategy called JWT. To understand more authentication, you can read [this article](https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314).

To test authentication:

- In Postman, do a *GET* on `http://localhost:4000/api/status/protected`. You should receive a `403` (Forbidden) as a response.

- Register a user by doing a *POST* to `http://localhost:4000/auth/register` with the body looking like: 

```json
{
    "email": "myemail@gmail.com",
    "password": "mypassword"
}
```

Don't forget to set the `content-type` to `raw` and `application/json`

- Now you can login by doing a *POST* to `http://localhost:4000/auth/login` with a body similar to:

```json
{
    "email": "myemail@gmail.com",
    "password": "mypassword"
}
```

This will bring you back a `token`. Copy the token you get in the response.

- Now, we can use this token for the `status/protected` route. Do a *GET* request to `http://localhost:4000/api/status/protected` and add a `header` with the name `Authorization` and the value: `Bearer the_token_from_previous step`, i.e. `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU2NTkwOTU4OX0.qidn4r7nrolFByyfd956Kh8BkOhwcaUSzyUK0V7su1c`