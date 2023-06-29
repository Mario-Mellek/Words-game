// Import the play and rank functions from the gameController module
const { play, rank } = require('../controllers/gameController');

// Create a new express router
const router = require('express').Router();

// Define a route for GET requests with the play function
router.get('/', play);
// Define a route for POST requests with the rank function
router.post('/', rank);

// Export the router
module.exports = router;
