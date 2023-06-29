import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayGame from './pages/PlayGame';
import LeaderBoard from './pages/LeaderBoard';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Playgame" element={<PlayGame />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;