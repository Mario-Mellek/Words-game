// Import the data object from the TestData.json file
const data = require('../TestData.json');

// Import the getRandomQuestions function from the randomQuestions module
const getRandomQuestions = require('../helper/randomQuestions');

// Import the rankCalc function from the rankCalc module
const rankCalc = require('../helper/rankCalc');

// Define an async function named play to handle GET requests
module.exports.play = async (_req, res) => {
  try {
    // Call the getRandomQuestions function to get an array of 10 random questions
    const questions = getRandomQuestions(data, 10);
    // Send a 200 OK response with the questions array as the response body
    res.status(200).json(questions);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response with an error message
    res.status(500).json({
      message:
        'An error occurred while processing your request, try again later',
    });
    // Re-throw the error to allow for further error handling and logging
    throw new Error(error);
  }
};

// Define an async function named rank to handle POST requests
module.exports.rank = async (req, res) => {
  try {
    // Call the rankCalc function to calculate the rank of the given final score
    const rankRounded = rankCalc(data, req.body.score);
    // Send a 200 OK response with the calculated rank as the response body
    res.status(200).json({ rank: rankRounded });
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response with an error message
    res.status(500).json({
      message:
        'An error occurred while processing your request, try again later',
    });
    // Re-throw the error to allow for further error handling and logging
    throw new Error(error);
  }
};
