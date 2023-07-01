import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useWindowSize, useTimeout } from 'react-use';
import Confetti from 'react-confetti';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { postScore } from '../utils/APIroutes';
import Score from '../components/Score';
import { toast, ToastContainer } from 'react-toastify';
import '../styles/leaderboard.css';

export default function LeaderBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { percentage } = location.state || {};
  const { width, height } = useWindowSize();
  const [rank, setRank] = useState('');
  const [bestRank, setBestRank] = useState('');
  const [score, setScore] = useState(0);
  const [isComplete] = useTimeout(5000);


  useEffect(() => {
    const user = localStorage.getItem('user') || undefined;
    const currentRank = user ? JSON.parse(user).rank.current : undefined;
    const bestRank = user ? JSON.parse(user).rank.best : undefined;
    const currentScore = user ? JSON.parse(user).prevAttempt : undefined;
    if (user && percentage) {
      scorePostReq(percentage);
    }
    else if (user && !percentage) {
      if (currentRank === 0 && currentScore === 0) {
        navigate('/playgame');
        return;
      }
      setRank(currentRank);
      setScore(currentScore);
      setBestRank(bestRank);
    }
    else {
      navigate('/');
    }
  }, []);

  const scorePostReq = async (score) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post(postScore, { 'score': score });
      user.rank.current = res.data.rank;
      if (user.rank.current > user.rank.best) {
        user.rank.best = user.rank.current;
      }
      localStorage.setItem('user', JSON.stringify(user));
      setRank(res.data.rank);
      setBestRank(user.rank.best);
    } catch (error) {
      toast.error(`${error.message} Try again later`);
    }
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className='main'>
        <div className='card'>
          <div>
            <p>You scored {percentage || score}%</p>
            <Score percentage={percentage} score={score} />
          </div>
          <div>
            <p>You are currently ranked among the top {rank}% of players.</p>
            <Score percentage={rank} />
          </div>
          <div>
            <p>Your best rank is {bestRank}%</p>
            <Score percentage={bestRank} />
          </div>
          <button className='optn-btn' onClick={() => navigate('/playgame')}>Play again</button>
        </div>
      </section>
      <Confetti
        width={width}
        height={height}
        recycle={!isComplete()}
      />
      <ToastContainer />
    </>
  );
}
