# staffany-test

This is an application which performs working shift management feature in a scheduling

system.

The backend is built by Strapi, a Headless-CMS framework.

The frontend is build with ReactJS and corresponding libraries.

## Prerequisites

Install [Node.js](https://nodejs.org).

Check the environment variables by type these commands:

> node -v

> npm -v

## Run Server

At source folder, run this command:

> cd backend

> npm install --save

After installing packages, run this command:

> npm run build && npm run develop

The development server should be available at [Server](http://localhost:1337/).

## Run Dashboard

At source folder, run this command:

> cd frontend

> npm install --save

After installing packages, run this command:

> npm run start

The development server should be available at [Dashboard](http://localhost:3000/).

## Test Instructions

Create an admin user in [WebAdmin](http://localhost:1337/admin).

Create a test user by clicking the 'Users' tab on the left -> Add New User

User has has following information.

> username: tester1

> password: Abc123

Use the user info above to login at the [Dashboard](http://localhost:3000/).

Click tab 'Shifts'

Add some new shifts, update, delete, and publish.

