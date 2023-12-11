import React, { useState, useEffect } from 'react';
import styles from './LeftSection.module.scss';
import CreateNewGroup from '../Modal/CreateNewGroup';
import CreatedGroup from '../Groups/CreatedGroup';

const LeftSection = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [upperCaseName, setUpperCaseName] = useState('');
  const [color, setColor] = useState('');
  const [groupNameVisibility, setGroupNameVisibility] = useState(
    localStorage.getItem("groupNameVisibility") === "true"? true : false
  );
  const [groupData, setGroupData] = useState([]);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('groupData')) || [];
    setGroupData(storedData);
  }, []); 

  useEffect(()=>{
    localStorage.setItem("groupNameVisibility", groupNameVisibility);
  },[groupNameVisibility])

  const clickHandler = () => {
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const createGroup = () => {
    if (groupName && color) {
      const duplicateName = groupData.some((group) => group.groupName === groupName);

      if (duplicateName) {
        alert('GroupName already exists');
      }

      if (!duplicateName) {
        // Update local storage and state
        const updatedData = [...groupData, { groupName, upperCaseName, color }];
        localStorage.setItem('groupData', JSON.stringify(updatedData));
        setGroupData(updatedData);

        setModalVisibility(false);
        setGroupNameVisibility(true);
      }
    }
  };

  return (
    <div className={styles.main}>
      <p className={styles.heading}>Pocket Notes</p>
      <div className={styles.groupsContainer}>
        <div className={styles.groups}>
          {groupNameVisibility &&
            groupData.map((groupDetails, index) => (
              <CreatedGroup
                key={index}
                groupName={groupDetails.groupName}
                upperCaseName={groupDetails.upperCaseName}
                color={groupDetails.color}
              />
            ))}
        </div>
        <button className={styles.addButton} onClick={clickHandler}>
          <p className={styles.symbol}>+</p>
        </button>
      </div>

      {modalVisibility && (
        <CreateNewGroup
          closeModal={closeModal}
          setGroupName={setGroupName}
          setUpperCaseName={setUpperCaseName}
          setColor={setColor}
          createGroup={createGroup}
        />
      )}
    </div>
  );
};

export default LeftSection;
