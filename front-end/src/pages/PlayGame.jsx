import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { getQuestions } from '../utils/APIroutes';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Line } from 'rc-progress';
import { RingLoader } from 'react-spinners';
import '../styles/playGame.css';

export default function PlayGame() {
  const [questions, setQuestions] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setIsloading] = useState(false);
  const navigate = useNavigate();

  // Check for stored user and get questions when component mounts
  useEffect(() => {
    const user = localStorage.getItem('user') || undefined;
    if (user) {
      getQuestionsReq();
    }
    else {
      navigate('/');
    }
  }, []);

  // Update percentage and navigate to leaderboard when currentQuestionIndex reaches 10
  useEffect(() => {
    if (currentQuestionIndex === 10) {
      setPercentage((score / questions.length) * 100);
      const user = JSON.parse(localStorage.getItem('user'));
      user.prevAttempt = percentage;
      if (user.personalBest < percentage) {
        user.personalBest = percentage;
      }
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        navigate('/leaderboard', { state: { percentage } });
      }, 3000);
    }
  }, [currentQuestionIndex, percentage]);

  // Get questions from API
  const getQuestionsReq = async () => {
    try {
      setIsloading(true);
      const res = await axios.get(getQuestions);
      setQuestions(res.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      toast.error(`${error.message} Try again later`);
    }
  };

  // Handle option click and update score and currentQuestionIndex
  const handleOptionClick = (option) => {
    if (option === questions[currentQuestionIndex].pos) {
      setCurrentQuestionIndex((prev) => ++prev);
      setCorrectAnswer(true);
      setScore((prev) => ++prev);
    } else {
      setCorrectAnswer(false);
      setScore((prev) => --prev);
    }
    setTimeout(() => {
      setCorrectAnswer(undefined);
    }, 500);
  };
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className='main'>
        <Line
          className='progress-bar'
          percent={currentQuestionIndex / 10 * 100}
          strokeWidth={1}
          strokeColor="#000000"
          trailWidth={0.5}
        />
        <span>{currentQuestionIndex / 10 * 100}%</span>
        {currentQuestionIndex === 10 &&
          <div className='endGame-screen'>
            <br />
            <span>You scored {percentage}% {percentage >= 80 ? 'Well Done!🥳' : 'You can do better 🤷‍♂️'}  </span>
            <span>Redirecting to the leaderboard.</span>
          </div>
        }
        {questions && questions[currentQuestionIndex] &&
          <div className={`card ${correctAnswer === undefined ? '' : (correctAnswer ? 'correct' : 'wrong')}`}>
            <h3>What is the Position of speech of the word:</h3>
            <p key={questions[currentQuestionIndex].id} className='word swipe-in'>{questions[currentQuestionIndex].word}</p>
            <div className='options'>
              <button className='optn-btn bounce' onClick={() => handleOptionClick('noun')}>Noun</button>
              <button className='optn-btn bounce' onClick={() => handleOptionClick('adverb')}>Adverb</button>
              <button className='optn-btn bounce' onClick={() => handleOptionClick('adjective')}>Adjective</button>
              <button className='optn-btn bounce' onClick={() => handleOptionClick('verb')}>Verb</button>
            </div>
          </div>
        }
        <ToastContainer />
      </section>
      <div className={`${loading ? 'loader' : null}`}>
        <RingLoader
          color="#000000"
          loading={loading}
          size={150}
          speedMultiplier={1}
        />
      </div>
    </>
  );
}
