import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './Home.module.scss';
import LeftSection from '../../components/HomeComponents/LeftSection';
import RightSection from '../../components/HomeComponents/RightSection';
import NotesWindow from '../../components/NotesWindow/NotesWindow';

const Home = () => {
  // isMobile State sets to true when width is below 600px
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // useEffect to recognize the size changing...
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.main}>
      {/* For Mobile view... */}
      {isMobile ? (
        <Routes>
          <Route path='/' element={<LeftSection />} />
          <Route path='/notes' element={<NotesWindow />} />
        </Routes>
      ) : (
        // For desktop view..
        <>
          <LeftSection />
          <Routes>
            <Route path='/' element={<RightSection />} />
            <Route path='/notes' element={<NotesWindow />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default Home;
