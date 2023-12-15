import React, { useState, useEffect } from 'react';
import styles from './LeftSection.module.scss';
import CreateNewGroup from '../Modal/CreateNewGroup';
import CreatedGroup from '../Groups/CreatedGroup';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';



const LeftSection = () => {
  // modalvisibility used to display modal when clicked on add button 
  const [modalVisibility, setModalVisibility] = useState(false);

  // state for groupName
  const [groupName, setGroupName] = useState('');

  // state for upperCase name
  const [upperCaseName, setUpperCaseName] = useState('');

  // state for color
  const [color, setColor] = useState('');

  // state to contol group creation (using this only after clicking create group appears)
  const [groupNameVisibility, setGroupNameVisibility] = useState(
    localStorage.getItem("groupNameVisibility") === "true" ? true : false
  );

  // groupData contains array of details (groupName,upperCaseName, color)
  const [groupData, setGroupData] = useState([]);

  const { setSelectedGroup } = useAppContext();
  const navigate = useNavigate()

  // useEffect to get group details from local storage..
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('groupData')) || [];
    setGroupData(storedData);
  }, []);


  useEffect(() => {
    localStorage.setItem("groupNameVisibility", groupNameVisibility);
  }, [groupNameVisibility])

  // this function executes when add button is clicked 
  const clickHandler = () => {
    setModalVisibility(true);
  };

  // this function executes when clicked outside modal
  const closeModal = () => {
    setModalVisibility(false);
  };

  // function executes after clicking create in modal
  const createGroup = () => {
    if (groupName && color) {
      const duplicateName = groupData.some((group) => group.groupName === groupName);

      if (duplicateName) {
        alert('GroupName already exists');
      }

      if (!duplicateName) {
        // updated data used when new group is created...
        const updatedData = [...groupData, { groupName, upperCaseName, color }];
        localStorage.setItem('groupData', JSON.stringify(updatedData));
        setGroupData(updatedData);

        setModalVisibility(false);
        setGroupNameVisibility(true);
      }
    }
  };

  // function executes when user clicks on created group
  const handleGroupClick = (index) => {
    const selectedGroup = groupData[index];
    setSelectedGroup(selectedGroup);
    navigate("/notes");
  };

  return (
    <div className={styles.main}>
      {/* pocketNotes heading */}
      <p className={styles.heading}>Pocket Notes</p>

      {/* container for created group */}
      <div className={styles.groupsContainer}>
        <div className={styles.groups}>
          {groupNameVisibility &&
            groupData.map((groupDetails, index) => (
              <CreatedGroup
                key={index}
                groupName={groupDetails.groupName}
                upperCaseName={groupDetails.upperCaseName}
                color={groupDetails.color}
                onClick={() => handleGroupClick(index)}
              />
            ))}
        </div>

        {/* add button */}
        <button className={styles.addButton} onClick={clickHandler}>
          <p className={styles.symbol}>+</p>
        </button>
      </div>
      
      {/* modal visibility */}
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
