import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import '../styles/landingPage.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LandingPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({
    userName: '',
    personalBest: '',
    prevAttempt: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsRegistered(true);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.userName.length <= 3) {
      toast.error('user name should be more than 3 charachters');
      return;
    }
    setIsRegistered(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const exitGame = () => {
    localStorage.clear('user');
    setIsRegistered(false);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className='home'>
        {!isRegistered ?
          <div className="login-box">
            <img src="giphy.gif" alt="Greeting-gif" />
            <form onSubmit={handleSubmit}>
              <div className="user-box">
                <input
                  onChange={handleChange}
                  placeholder='User-name'
                  type="text"
                  name="userName"
                  id="name" />
              </div>
              <input type="submit" value="Enter" />
            </form>
          </div>
          :
          <div>
            <h1>Welcom {user.userName} Click <Link to='/Playgame'>here to play</Link></h1>
            {!user.personalBest && !user.prevAttempt ? <span>Come back after playing to check your high score</span> : null}
            {user.personalBest && <p>Personal best: {user.personalBest} </p>}
            {user.prevAttempt && <p>Previous attempt: {user.prevAttempt} </p>}
            <button className='exit-btn' onClick={exitGame}>Exit</button>
          </div>}
        <ToastContainer />
      </section>
    </>
  );
}
