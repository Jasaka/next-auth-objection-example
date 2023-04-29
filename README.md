# Next Auth Objection Example

## About
[Next.js](https://nextjs.org/) example app using [Objection.js](https://vincit.github.io/objection.js/) and [Auth.js](https://authjs.dev/) for authentication.

Database is [PostgreSQL](https://www.postgresql.org/) and [Knex.js](https://knexjs.org/) is used as a query builder.

Due to the fact that NextAuth.js does not support Objection.js out of the box, a custom adapter is used. See [Auth.js Adapters](https://authjs.dev/reference/adapters) for more information.

A test suite is included using [Jest](https://jestjs.io/), running on [swc](https://swc.rs/).

## Development

Copy the `dist.env.local` file to `.env.local` and fill in the values for GitHub Authentication.

Start the PostgreSQL docker container with `docker-compose up`.

Run knex migrations with `yarn migrate:latest` to create the database tables.

Start the app with `yarn dev`. You will reach the app at `http://localhost:3000` for development.

## Testing

Copy the `dist.env.local` file to `.env.test`.

Start the PostgreSQL docker container with `docker-compose up`.

Run knex migrations with `yarn migrate:latest`, if not already done, to create the database tables.

Run the tests with `yarn test`.