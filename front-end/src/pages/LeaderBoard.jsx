import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { postScore } from '../utils/APIroutes';

export default function LeaderBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { percentage } = location.state || {};
  const { width, height } = useWindowSize();
  const [rank, setRank] = useState('');


  useEffect(() => {
    const user = localStorage.getItem('user') || undefined;
    const currentRank = user ? JSON.parse(user).rank.current : undefined;
    const currentScore = user ? JSON.parse(user).prevAttempt : undefined;
    if (user && percentage && currentRank === 0) {
      console.log(percentage, currentScore);
      scorePostReq(percentage);
    }
    else if (user && !percentage) {
      console.log('"no per"', currentRank, currentScore);
      setRank(currentRank);
    }
    else {
      navigate('/');
    }
  }, []);

  const scorePostReq = async (score) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.post(postScore, { 'score': score });
    user.rank.current = res.data.rank;
    if (user.rank.current > user.rank.best)
      user.rank.best = user.rank.current;
    localStorage.setItem('user', JSON.stringify(user));
    setRank(res.data.rank);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <section>
        <p>Scored {percentage}%, Rank {rank}%</p>
        <Confetti
          width={width}
          height={height}
        />
      </section>
    </>
  );
}
