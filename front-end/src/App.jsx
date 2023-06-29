import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayGame from './pages/PlayGame';
import LeaderBoard from './pages/LeaderBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayGame />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;