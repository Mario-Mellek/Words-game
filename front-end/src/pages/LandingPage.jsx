import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import '../styles/landingPage.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Score from '../components/Score';

export default function LandingPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({
    userName: '',
    personalBest: 0,
    prevAttempt: 0,
    rank: {
      current: 0,
      best: 0
    }
  });

  // Check for stored user in local storage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsRegistered(true);
    }
  }, []);

  // Update user state when name input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission to register user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.userName.length === 0) {
      toast.error('User name can\'t be empty');
      return;
    }
    if (user.userName.length <= 3) {
      toast.error('User name Must be more than 3 characters');
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    setIsRegistered(true);
  };

  // Clear user from local storage and set isRegistered state to false
  const exitGame = () => {
    localStorage.clear('user');
    setIsRegistered(false);
  };
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className='main'>
        {!isRegistered ?
          <div className="login-box">
            <img src="giphy.gif" alt="Greeting-gif" />
            <form onSubmit={handleSubmit}>
              <div className="user-box">
                <input
                  onChange={handleChange}
                  placeholder='Enter your name'
                  type="text"
                  name="userName"
                  id="name" />
              </div>
              <input type="submit" value="Enter" />
            </form>
          </div>
          :
          <div className='card'>
            <h1>Welcom <span>{user.userName}</span> Click <Link to='/Playgame'>here to play</Link></h1>
            {user.personalBest === 0 && user.prevAttempt === 0 ? <span>Come back after playing to check your score</span> : null}
            {user.personalBest !== 0 && (
              <div className='personal-score'>
                <p>Personal best: {user.personalBest}% </p>
                <Score percentage={user.personalBest} />
              </div>)}
            {user.prevAttempt !== 0 && (
              <div className='personal-score'>
                <p>Previous attempt: {user.prevAttempt}% </p>
                <Score percentage={user.prevAttempt} />
              </div>)}
            <button className='exit-btn' onClick={exitGame}>Exit</button>
          </div>}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </section>
    </>
  );
}
