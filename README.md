
# Magic Mover API

The **Magic Mover API** provides RESTful endpoints for managing movers and their missions. This API allows you to create, update, and track movers, their states, and mission logs. Swagger documentation is available for API reference.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Endpoints](#endpoints)
- [Running with Docker](#running-with-docker)

## Getting Started

This project requires **Node.js**, **MongoDB**, and **TypeScript**. Follow the instructions below to set up and run the project.

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://gitlab.com/chat51/magic-mover.git
   cd magic-mover-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/magic_mover
   ```

4. **Run the server**
   ```bash
   npm  start
   ```

   The server will start on `http://localhost:5001`.

## API Documentation

Swagger is used to document the API. Once the server is running, you can access the Swagger documentation at:

```
http://localhost:5001/api-docs
```

## Running Tests

1. **Set up the test database**

   Update your `.env` file with a `TEST_MONGO_URI` environment variable for the test database.

2. **Run the tests**
   ```bash
   npm test
   ```

   The tests include CRUD operations and specific functionality for Magic Mover entities and Mission Logs.

## Running with Docker

If you prefer to run the application using Docker, follow the steps below to get started:

### Prerequisites

Ensure that **Docker** and **Docker Compose** are installed on your machine.

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application with Docker

1. **Build the Docker images:**
   ```bash
   docker-compose build
   ```

2. **Start the application using Docker Compose:**
   ```bash
   docker-compose up
   ```

   This will start the application and its dependencies, such as the database, in separate containers.

3. **To Access the application, run Browser in :**
   ```bash
    http://localhost:5002/api-docs
   ```


4. **To stop the application, run:**
   ```bash
   docker-compose down
   ```

5. **Run in detached mode (background):**
   ```bash
   docker-compose up -d
   ```


### Docker Compose Configuration

The `docker-compose.yml` file defines the following services:

- **app**: The backend application container running the API.
- **db**: The MongoDB container for data storage.

## Folder Structure

```
├── src
│   ├── controllers
│   ├── database
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── shared
│   ├── services
│   ├── src/shared
│   ├── tests
│   └── validators
│   
├── .dockerignore
├── .env
├── .env.test
├── app.ts
├── .gitignore
├── docker-compose.yml
├── jest.config.js
├── package-lock.json
├── package.json
├── readme
├── server.ts
├── swagger.ts
└── tsconfig.json

```

## Technologies Used

- **Node.js** and **Express**: Backend framework
- **Mongoose**: MongoDB ODM for data modeling
- **Jest** and **Supertest**: Testing framework
- **Swagger**: API documentation
- **TypeScript**: Type safety and improved development experience

## Endpoints

Here are the primary endpoints available in the API:

### Magic Mover

- **Create a new mover**
  - `POST /magic-mover`
- **Update a mover**
  - `PUT /magic-mover/:id`
- **Delete a mover**
  - `DELETE /magic-mover/:id`
- **Load a mover**
  - `POST /magic-mover/:id/load`
- **Start a mission**
  - `POST /magic-mover/:id/start-mission`
- **End a mission**
  - `POST /magic-mover/:id/end-mission`
- **Retrieve top movers**
  - `GET /magic-mover/movers/top-movers`

### Mission Logs

- **Create a mission log**
  - `POST /mission-log`
- **Retrieve a mission log by ID**
  - `GET /mission-log/:id`
- **Retrieve all mission logs**
  - `GET /mission-log`
- **Update a mission log**
  - `PUT /mission-log/:id`
- **Delete a mission log**
  - `DELETE /mission-log/:id`

## License

This project is licensed under the MIT License.

