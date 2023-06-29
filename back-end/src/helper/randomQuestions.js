function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomQuestions(data, count) {
  // Filtering wordList array by POS
  const adjectives = data.wordList.filter((word) => word.pos === 'adjective');
  const adverbs = data.wordList.filter((word) => word.pos === 'adverb');
  const nouns = data.wordList.filter((word) => word.pos === 'noun');
  const verbs = data.wordList.filter((word) => word.pos === 'verb');

  // Selecting one random word from each group of POS
  const selectedWords = [
    adjectives[Math.floor(Math.random() * adjectives.length)],
    adverbs[Math.floor(Math.random() * adverbs.length)],
    nouns[Math.floor(Math.random() * nouns.length)],
    verbs[Math.floor(Math.random() * verbs.length)],
  ];

  // Completing the array up to the count value by selecting random words.
  while (selectedWords.length < count) {
    const randomWord =
      data.wordList[Math.floor(Math.random() * data.wordList.length)];
    if (!selectedWords.includes(randomWord)) {
      selectedWords.push(randomWord);
    }
  }

  shuffle(selectedWords);

  return selectedWords;
}
module.exports = getRandomQuestions;
