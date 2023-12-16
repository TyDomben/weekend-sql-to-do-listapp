// Importing the express module, a Node.js framework for building web applications and APIs.
const express = require('express');

// Initializing an Express application. This creates an instance of an Express application,
// which is used to configure the server, set routes, and listen for incoming connections.
const app = express();

// Requiring the 'todos' router module from the './routes/todos.router.js' file.
// This module is expected to contain Express routes related to 'todos' functionality.
const todos = require('./routes/todos.router.js');

// Defining a variable 'PORT'. The process.env global variable in Node.js is injected
// by the Node.js runtime and provides a way to access environment variables.
// Here, it's used to determine the port number on which the server should listen.
// If process.env.PORT is not set, the default value 5001 is used.
let PORT = process.env.PORT || 5001;

// Conditional check for the NODE_ENV environment variable.
// If the environment is set to 'test', the port is overridden to 5002.
// This is a common practice to use a different port for testing environments,
// allowing for parallel development and testing.
//  !Do not modify this !
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

// app.use is a method to configure middleware used by the Express application.
// Here, express.static is a built-in middleware function to serve static files.
// It's serving files from the 'public' directory (relative to the directory from where the Node.js process is running).
// Static files are files that clients download as they are from the server. Examples include images, CSS files, and JavaScript files.
app.use(express.static('./server/public'));

// Adding middleware to parse JSON. This middleware will parse incoming request bodies in a middleware before handlers,
// available under the req.body property. It's a built-in middleware function in Express.
// It parses incoming requests with JSON payloads, a common content-type in client-server communications.
app.use(express.json());

// Mounting the 'todos' router module on the '/todos' path.
// Any request on the '/todos' route will be passed to the 'todos' router for handling.
app.use('/todos', todos);

// Starting the server to listen on the defined PORT.
// The listen method is used to bind and listen for connections on the specified host and port.
// This method is an asynchronous operation in Node.js.
app.listen(PORT, (), => {
  // Logging to the console when the server starts listening.
  // This is useful for debugging and to ensure that the server starts correctly.
  console.log('server running on: ', PORT);
});
