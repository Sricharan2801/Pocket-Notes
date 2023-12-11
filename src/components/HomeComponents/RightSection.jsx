import React from 'react'
import styles from "./RightSection.module.scss"
import homepageImage from "../../assets/homepageImage.png"
import lockImage from "../../assets/lockImage.png"

const RightSection = () => {
    return (
        <div className={styles.main}>
            <div className={styles.detailsContainer}>
                <img src={homepageImage} alt="pocketNotesImage" className={styles.image} />
                <p className={styles.title}>Pocket Notes</p>
                <p className={styles.description}>Send and receive messages without keeping your phone online.
                    Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>

            <div className={styles.securityMessageContainer}>
                <img src={lockImage} alt="lockImage" className={styles.lockImage}/>
                <p className={styles.securityMessage}>end-to-end encrypted</p>
            </div>
        </div>
    )
}

export default RightSection
