// Define a function named shuffle to shuffle the elements of an array
function shuffle(array) {
  // Iterate over the elements of the array in reverse order
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the elements at indexes i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Define a function named getRandomQuestions to get an array of random questions
// The array includes at least 1 adjective, 1 adverb, 1 noun, and 1 verb.
function getRandomQuestions(data, count) {
  // Filter the wordList array by part of speech
  const adjectives = data.wordList.filter((word) => word.pos === 'adjective');
  const adverbs = data.wordList.filter((word) => word.pos === 'adverb');
  const nouns = data.wordList.filter((word) => word.pos === 'noun');
  const verbs = data.wordList.filter((word) => word.pos === 'verb');

  // Select one random word from each group of part of speech
  const selectedWords = [
    adjectives[Math.floor(Math.random() * adjectives.length)],
    adverbs[Math.floor(Math.random() * adverbs.length)],
    nouns[Math.floor(Math.random() * nouns.length)],
    verbs[Math.floor(Math.random() * verbs.length)],
  ];

  // Complete the selectedWords array up to the count value by selecting random words
  while (selectedWords.length < count) {
    const randomWord =
      data.wordList[Math.floor(Math.random() * data.wordList.length)];
    if (!selectedWords.includes(randomWord)) {
      selectedWords.push(randomWord);
    }
  }

  // Shuffle and Return the selectedWords array
  shuffle(selectedWords);
  return selectedWords;
}

// Export the getRandomQuestions function
module.exports = getRandomQuestions;
