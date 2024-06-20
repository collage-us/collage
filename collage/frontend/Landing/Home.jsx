import React from 'react';
import '../styles/Home.css';
import Home1 from './Home-1';
import Home2 from './Home-2';
import Home3 from './Home-3';

const Home = () => {
  return (
    <div className="home-container">
      <section className="section">
        <Home1/>
      </section>
      <section className="section">
        <Home2/>
      </section>
      <section className="section">
        <Home3/>
      </section>
    </div>
  );
};
export default Home;