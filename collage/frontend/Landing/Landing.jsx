import React, {lazy} from 'react';
import '../CSS/Home.css';
const Home1 = lazy(() => import('./Landing-1'));
const Home2 = lazy(() => import('./Landing-2'));
const Home3 = lazy(() => import('./Landing-3'));
const Home4 = lazy(() => import('./Landing-4'));

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