import React, { useState } from 'react';
import styles from "./CreateNewGroup.module.scss";

const CreateNewGroup = ({ closeModal, setGroupName, setUpperCaseName,setColor, createGroup }) => {

    const changeHandler = (e) => {
        const enteredString = e.target.value
        setGroupName(enteredString)

        const shortName = enteredString.split(" ").slice(0, 2).map(words => words.charAt(0).toUpperCase()).join('')
        setUpperCaseName(shortName)
    }

    const colorHandler = (color) => {
        setColor(color)
    }
    
    return (
        <div>
            <div className={styles.backdrop} onClick={closeModal}></div>
            <div className={styles.modal}>

                <p className={styles.heading}>Create New group</p>

                <div className={styles.groupName}>
                    <p className={styles.text}> Group name  </p>
                    <input
                        type="text"
                        placeholder='Enter group name'
                        className={styles.inputArea}
                        onChange={(e) => changeHandler(e)} />
                </div>

                <div className={styles.chooseColor}>
                    <p className={styles.text}>Choose color</p>
                    <div className={styles.colors}>
                        <div className={styles.color} id={styles.purpleColor} onClick={() => colorHandler("rgba(179, 139, 250, 1)")}></div>
                        <div className={styles.color} id={styles.pinkColor} onClick={() => colorHandler("rgba(255, 121, 242, 1)")}></div>
                        <div className={styles.color} id={styles.lightGreenColor} onClick={() => colorHandler("rgba(67, 230, 252, 1)")}></div>
                        <div className={styles.color} id={styles.orangeColor} onClick={() => colorHandler("rgba(241, 149, 118, 1)")}></div>
                        <div className={styles.color} id={styles.blueColor} onClick={() => colorHandler("rgba(0, 71, 255, 1)")}></div>
                        <div className={styles.color} id={styles.skyBlueColor} onClick={() => colorHandler("rgba(102, 145, 255, 1)")}></div>
                    </div>
                </div>

                <button className={styles.createButton} onClick={createGroup}>Create</button>
            </div>
        </div>
    );
}

export default CreateNewGroup;
