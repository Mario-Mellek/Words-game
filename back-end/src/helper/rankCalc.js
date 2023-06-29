function rankCalc(data, finalScore) {
  const scoresBelowFinalScore = data.scoresList.filter(
    (score) => score < finalScore
  );
  const rank = (scoresBelowFinalScore.length / data.scoresList.length) * 100;
  const rankRounded = Math.round(rank * 100) / 100;
  return rankRounded;
}

module.exports = rankCalc;
