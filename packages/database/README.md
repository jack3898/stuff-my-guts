# Database

This package defines the storage and retrieval of data from client-side queries through to the database schema itself using Prisma.

## `queries` directory

Holds all of the client-side queries.

INFO: Run `npm run generate-query-hooks` to automatically introspect and generate fully-typed query hooks and types to be used for the client-side app.

## `typedefs` directory

Holds the GraphQL schema to define the structure required for client-side queries.

## `resolvers` directory

The resolvers directory holds many methods that fetch data that end up as JSON objects with the same structure defined in the typedefs.

## `schema` directory

This defines the schema of the database, and influences all of the above directories.

INFO: Run `npm run generate` to forcibly push schema changes to the database.

## `seed-data` directory

Us developers need test data! You can define data that can be injected into a fresh database via `npm run seed` here.
