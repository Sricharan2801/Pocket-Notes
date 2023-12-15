import React, { useState, useEffect } from 'react';
import styles from "./NotesWindow.module.scss";
import sendIcon from "../../assets/sendIcon.png";
import sendIconColored from "../../assets/sendIconColored.png";
import { useAppContext } from '../AppContext';
import { v4 as uuidv4 } from 'uuid';
import FormattedDate from "../../Utils/Date"
import FormattedTime from "../../Utils/Time"
import { useNavigate } from 'react-router-dom';
import backArrow from "../../assets/backArrow.png"


const NotesWindow = () => {
  // text state for entered text.
  const [text, setText] = useState("");

  // selectedGroup for identifying selected group
  const { selectedGroup } = useAppContext();

  // notes for adding all entered notes
  const [notes, setNotes] = useState([]);

  // is mobile for identifying mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // navigate is used to route for required component..
  const navigate = useNavigate()

  window.onload = () => {
    navigate("/")
  }

  // useEffect for getting the notes from local storage
  useEffect(() => {
    if (selectedGroup && selectedGroup.groupName) {
      const storedNotes = JSON.parse(localStorage.getItem(`notesOf ${selectedGroup.groupName}`)) || [];
      setNotes(storedNotes);
    }
  }, [selectedGroup]);


  // useEffect for setting the notes into local storage 
  useEffect(() => {
    if (selectedGroup && selectedGroup.groupName) {
      localStorage.setItem(`notesOf ${selectedGroup.groupName}`, JSON.stringify(notes));
    }
  }, [notes, selectedGroup]);

  // function executes when user clicks the send button
  const handleSend = () => {
    if (text.trim() !== "") {
      const newNote = {
        id: uuidv4(), // generates a unique ID
        text,
        timeStamp: FormattedTime(),
        dateStamp: FormattedDate(),
      };

      // Update the notes list
      setNotes((prevNotes) => [...prevNotes, newNote]);

      // Clear the text area
      setText("");
    }
  };

  // function for identifying change in the text area
  const changeHandler = (e) => {
    setText(e.target.value);
  };

  // setting circle background based on selected group
  const circleColor = {
    backgroundColor: selectedGroup ? selectedGroup.color : 'initial',
  }

  // works in mobile view
  const navigateToHome = () => {
    navigate("/")
  }


  return (
    <div className={styles.main}>
      {/* header (contains group details) */}
      <div className={styles.header}>

        {
          isMobile ? <img src={backArrow} alt="" className={styles.backArrow}
            onClick={() => navigateToHome()} /> : null
        }

        <div className={styles.circle} style={circleColor}>
          <p className={styles.shortName}>{selectedGroup ? selectedGroup.upperCaseName : ""}</p>
        </div>

        <p className={styles.groupName}>{selectedGroup ? selectedGroup.groupName : ""}</p>
      </div>

      {/* body (contains all notes..) */}
      <div className={styles.body}>
        <div className={styles.notesContainer}>
          {notes.map((note) => (
            <div key={note.id} className={styles.note}>
              {note.text}

              <div className={styles.dateAndTimeContainer}>
                <p className={styles.dateAndTime}>{note.dateStamp}</p>
                <p className={styles.seperator}></p>
                <p className={styles.dateAndTime}>{note.timeStamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer (text box) */}
      <div className={styles.footer}>
        <textarea
          className={styles.textBox}
          placeholder='Enter your text here...........'
          value={text}
          onChange={(e) => changeHandler(e)}>
        </textarea>

        {text ? <img src={sendIconColored} alt="" className={styles.button} onClick={handleSend} /> :
          <img src={sendIcon} alt="" className={styles.button} />
        }
      </div>
    </div>
  );
}

export default NotesWindow;
