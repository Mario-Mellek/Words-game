import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/navBar.css';

export default function NavBar() {
  return (
    <nav>
      <div className='logo'>
        <Link className='home-btn' to='/'>
          <h1>Words<span>Game</span></h1>
        </Link>
      </div>
      <div className='nav-list'>
        <ul>
          <li><NavLink activeclassname="active" to='/'>Home</NavLink></li>
          <li><NavLink activeclassname="active" to='/Playgame'>Play</NavLink></li>
          <li><NavLink activeclassname="active" to='/leaderboard'>Leader Board</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
