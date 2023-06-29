const data = require('../TestData.json');
const getRandomQuestions = require('../helper/randomQuestions');
const rankCalc = require('../helper/rankCalc');

module.exports.play = async (_req, res) => {
  try {
    const questions = getRandomQuestions(data, 10);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message:
        'An error occurred while processing your request, try again later',
    });
    throw new Error(error);
  }
};

module.exports.rank = async (req, res) => {
  try {
    const rankRounded = rankCalc(data, req.body.score);
    res.status(200).json({ rank: rankRounded });
  } catch (error) {
    res.status(500).json({
      message:
        'An error occurred while processing your request, try again later',
    });
    throw new Error(error);
  }
};
