// Import the express module
const express = require('express');

// Import the gameRoutes module
const gameRoutes = require('./src/routes/gameRoutes');

// Create a new express application
const app = express();

// Import the cors module
const cors = require('cors');

// Set the port number for the application to listen on 8080
const port = 8080;

// Use cors middleware for cross-origin resource sharing
app.use(cors());

// Use the express.json middleware for parsing incoming JSON payloads
app.use(express.json());

// Use the gameRoutes module to handle requests on the /game path
app.use('/game', gameRoutes);

// Define a route for GET requests on the / path
app.get('/', (_req, res) => {
  // Send a response indicating that the server is running
  res.send('Server Running');
});

// Start listening for incoming requests on the specified port
app.listen(port, () => {
  // Log a message to the console when the server starts listening
  console.log(`server connected on port ${port}`);
});
