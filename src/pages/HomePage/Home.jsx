import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './Home.module.scss';
import LeftSection from '../../components/HomeComponents/LeftSection';
import RightSection from '../../components/HomeComponents/RightSection';
import NotesWindow from '../../components/NotesWindow/NotesWindow';

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

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
      {isMobile ? (
        <Routes>
          <Route path='/' element={<LeftSection />} />
          <Route path='/notes' element={<NotesWindow />} />
        </Routes>
      ) : (
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
