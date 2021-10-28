# Node.js backend template
This is a backend project template for Node.js. The stack is the following:

:zap: Fastify

:fax: Pino

:round_pushpin: Redis

:vertical_traffic_light: Tap 

The project is organized in a monorepo using `lerna` and `yarn`. There are 2 packages: **api** and **storage**.

# API package
The **API** package is a server built with `fasify` that expose some example routes(supporting json schemas) and store some dummy data on a key-value storage. The API tests are done using `tap`

# Storage package
The **storage** package contains an abstraction over a key-value storage. Currently there are only 2 key-value storage: **redis** and **in_memory**. 
The **in_memroy** is an array that stores object with the following format `{ "key": "name", "value": "Fabrizio" }`


# Before running the project
From the root run: `lerna bootstrap`

Then you need to create an `.env` file with the needed env variables (check the `.env.example` file in the root) in the **api** package. 
Then run `nvm use` in order to select the node version of the project.

# Development mode
To start the server in develoment mode you need `Docker` and `docker-compose` to be installed (https://www.docker.com/products/docker-desktop  https://docs.docker.com/compose/install/).

You can run the fastify server executing from the root `yarn start:api:dev` that will run the `docker-compose`.

And the server is up :smile_cat:

# Test
You can run the tests for the api package executing `yarn test:api` while for the storage package you need to run `yarn test:storage`.

# Future developments

- Add `typescript` support
- Add `swagger` support
- Add `PostgreSQL` support
- Add monitoring support
- Integrate an IaC library
- Setup infrastructure for `Kubernetes`
