# Words Game Back-End

## Description

Words Game is an interactive activity that helps students practice categorizing words according to their part of speech. The back-end of the game is an Express server that handles requests and includes two routes: one for fetching 10 random questions that must contain 1 adverb, 1 verb, 1 adjective, and 1 noun, and one for ranking players based on their final scores.

## Installation

1. Navigate to the `back-end` directory.
2. Run `npm install` to install dependencies.
3. Run `npm run start` to start the server.

## Usage

The back-end server includes two routes:

- `/game` (GET): Fetches 10 random questions that must contain 1 adverb, 1 verb, 1 adjective, and 1 noun. The server responds with an array of random questions.
- `/game` (POST): Ranks a player based on their final score. The final score should be included in the request body. The server responds with the player's rank.
