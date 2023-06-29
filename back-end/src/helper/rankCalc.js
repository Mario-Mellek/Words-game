// Define a function named rankCalc to calculate the rank of a given final score
function rankCalc(data, finalScore) {
  // Filter the scoresList array to get an array of scores that are below the given final score
  const scoresBelowFinalScore = data.scoresList.filter(
    (score) => score < finalScore
  );
  // Calculate the rank as the percentage of scores in the scoresList array that are below the given final score
  const rank = (scoresBelowFinalScore.length / data.scoresList.length) * 100;
  // Round the rank to the nearest hundredth
  const rankRounded = Math.round(rank * 100) / 100;
  // Return the rounded rank
  return rankRounded;
}

// Export the rankCalc function
module.exports = rankCalc;
