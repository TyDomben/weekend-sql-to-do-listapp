// Importing the 'pg' module, which is a PostgreSQL client for Node.js.
// This module provides a set of methods and properties to interact with a PostgreSQL database
// from within a Node.js application.
const pg = require('pg')

// Defining a variable 'databaseName' with the default value 'weekend-to-do-app'.
// This variable holds the name of the PostgreSQL database that this Node.js application will connect to.
let databaseName = 'weekend-to-do-app'

// Conditional check for the NODE_ENV environment variable.
// The process.env global variable in Node.js is injected by the Node.js runtime and provides
// a way to access environment variables. Here, it's used to determine if the application
// is running in a 'test' environment.
// If the application is in a test environment, the 'databaseName' variable is set to 'prime_testing'.
// This practice allows the separation of development and testing databases,
// ensuring that tests do not interfere with development data.
if (process.env.NODE_ENV === 'test') {
  databaseName = 'prime_testing'
}

// Creating a new pool of connections using pg.Pool.
// A pool is a cache of database connections maintained so that connections can be reused when future requests to the database are required.
// Pooling is a standard practice to optimize database interactions.
// The pool configuration object includes:
// - host: The hostname of the database server. 'localhost' refers to the local machine.
// - port: The port number on which the PostgreSQL server is running. 5432 is the default port for PostgreSQL.
// - database: The name of the database to connect to, as defined by the 'databaseName' variable.
// - allowExitOnIdle: A boolean that, when set to true, allows the Node.js process to exit if there are no active connections in the pool.
//   This is particularly useful during graceful shutdowns or in situations where maintaining an active process is not necessary.
const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: databaseName,
    allowExitOnIdle: true 
})

// Exporting the pool object.
// The module.exports statement is used to export an object, function, or variable from a module in Node.js.
// Here, it's exporting the 'pool' object so that it can be used in other parts of the application,
// such as in route handlers where database queries are made.
module.exports = pool

