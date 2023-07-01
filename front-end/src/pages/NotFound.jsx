import React from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className='main'>
        <h1>You must be lost, <Link to='/'>press here</Link></h1>
      </section>
    </>
  );
}
