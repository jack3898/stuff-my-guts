# Meal Ideas

NOTE: Meal Ideas is currently a work in progress!

Meal Ideas is an app that intelligently plans your dinners for the next 7 days (or will be when it's done lol). The idea is that you tell it all the dinners you know, and then your worries of deciding what to eat are over. It will take things one step further, as you will not only tell you your plan for the next 7 days, it will be topped with ingredients and contextual decisions like roasts being best for Sundays. The idea is there will be some form of smart algorithm that makes the best decisions possible for you.

## Setting up the project

As I said, this is a WIP but if you wish to clone the project yourself then go ahead!

Setup is below:

-   Clone this repository with `git clone`
-   Install Docker with Docker Compose
-   Run `npm install`
-   Run `docker-compose up` to launch a containerised database
    -   Ensure your .env file is set in both the root of the monorepo and in apps/backend! .env.example files have been made to help you.
-   Run `npm run seed` to generate the database, tables and populate it with sample data
-   Run `npm run dev` to build and launch the client and backend gateway
-   Done!

## Technologies

The frontend application is written in TypeScript React, utilising a GraphQL API bundled with a custom Webpack configuration.

The backend is also written in TypeScript with Prisma to make database management far easier. Support for code and type generation has been implemented to make the code as type safe as possible.

The database technology of choice is PostgreSQL, but as this project uses Prisma, support for MongoDB, MySQL and other database technologies is possible (just a tweak of some settings).

Jest is the unit testing framework of choice. Pre-commit hooks and eslint support is on its way.

This project also uses the monorepo approach, all packages and dependencies are defined in this repository.
