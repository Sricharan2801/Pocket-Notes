import React, { useState } from 'react'
import styles from "./Home.module.scss"
import LeftSection from '../../components/HomeComponents/LeftSection'
import RightSection from '../../components/HomeComponents/RightSection'
import NotesWindow from '../../components/NotesWindow/NotesWindow'
import { Routes,Route } from 'react-router-dom'

const Home = () => {
 
  return (
    <div className={styles.main} >
      <LeftSection/>
     
      <Routes>
        <Route path='/' element={ <RightSection />}></Route>
        <Route path='/notes' element={<NotesWindow/>} />
      </Routes>
    </div>
  )
}

export default Home
