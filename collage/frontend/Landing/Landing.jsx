import React from 'react';
import '../CSS/Home.css';
import Home1 from './Landing-1';
import Home2 from './Landing-2';
import Home4 from './Landing-4';
import Home3 from './Landing-3';

const Landing = () => {
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
      <section className="section">
        <Home4/>
      </section>
    </div>
  );
};
export default Landing;