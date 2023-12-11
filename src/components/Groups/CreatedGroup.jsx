import React from 'react'
import styles from "./CreatedGroup.module.scss"
import { useNavigate } from 'react-router-dom'

const CreatedGroup = ({groupName,upperCaseName,color}) => {

  const circleColor = {
    backgroundColor: color
  }

  const navigate = useNavigate()

  const navigateToNotes = ()=>{
    navigate("/notes");
  }
  return (
    <div className={styles.main} onClick={navigateToNotes}>
      
      <div className={styles.circle} style={circleColor}>
        <p className={styles.shortName}>{upperCaseName}</p>
      </div>
      <p className={styles.groupName} >{groupName}</p>
    </div>
  )
}

export default CreatedGroup
