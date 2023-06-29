const data = require('../TestData.json');
const getRandomQuestions = require('../helper/randomQuestions');

module.exports.play = async (_req, res) => {
  try {
    const questions = getRandomQuestions(data, 10);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message:
        'An error occurred while processing your request, Try again later',
    });
    throw new Error(error);
  }
};

module.exports.rank = async (_req, res) => {
  res.status(201).json('Testing POST route');
};
