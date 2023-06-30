import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { getQuestions } from '../utils/APIroutes';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../styles/playGame.css';

export default function PlayGame() {
  const [questions, setQuestions] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      getQuestionsReq();
    }
    else {
      navigate('/');
    }
  }, []);

  const getQuestionsReq = async () => {
    try {
      const res = await axios.get(getQuestions);
      setQuestions(res.data);
    } catch (error) {
      toast.error(`${error.message} Try again later`);
    }
  };

  const handleOptionClick = (option) => {
    if (option === questions[currentQuestionIndex].pos) {
      setCurrentQuestionIndex((prev) => ++prev);
      setCorrectAnswer(true);
    } else
      setCorrectAnswer(false);

    setTimeout(() => {
      setCorrectAnswer(undefined);
    }, 1000);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className='main'>
        {questions && questions[currentQuestionIndex] && (
          <div className={`words-card ${correctAnswer === undefined ? '' : (correctAnswer ? 'correct' : 'wrong')}`}>
            <h3>What is the Position of speech of the word:</h3>
            <p key={questions[currentQuestionIndex].id} className='swipe-in'>{questions[currentQuestionIndex].word}</p>
            <div className='options'>
              <button className='optn-btn bounce' onClick={() => handleOptionClick('noun')}>Noun</button>
              <button className='optn-btn bounce' onClick={() => handleOptionClick('adverb')}>Adverb</button>
              <button className='optn-btn bounce' onClick={() => handleOptionClick('adjective')}>Adjective</button>
              <button className='optn-btn bounce' onClick={() => handleOptionClick('verb')}>Verb</button>
            </div>
          </div>
        )}
        <ToastContainer />
      </section>
    </>
  );
}
