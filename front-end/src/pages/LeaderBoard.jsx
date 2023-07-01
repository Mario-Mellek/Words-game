import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { postScore } from '../utils/APIroutes';

export default function LeaderBoard() {
  const location = useLocation();
  const { percentage } = location.state || {};
  const { width, height } = useWindowSize();
  const [rank, setRank] = useState('');

  useEffect(() => {
    if (percentage) {
      console.log(percentage);
      scorePostReq();
    }
  }, [percentage]);

  const scorePostReq = async () => {
    const res = await axios.post(postScore, { 'score': percentage });
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
