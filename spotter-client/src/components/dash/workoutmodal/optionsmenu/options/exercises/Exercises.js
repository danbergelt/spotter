import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import ExercisesHead from "./ExercisesHead";
import ManageExercises from "./ManageExercises";
import AddExercises from "./AddExercises";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const Exercises = React.memo(({ setExercisesModal }) => {
  const modalState = useSelector(state => state.optionsReducer.exercises);
  const savedExercises = useSelector(
    state => state.fetchExercisesReducer.savedExercises
  );
  const [tab, setTab] = useState(0);
  const [msg, setMsg] = useState({});

  return (
    <Modal
      style={
        tab === 1
          ? { ...styles, content: { ...styles.content, height: "200px" } }
          : styles
      }
      isOpen={modalState}
      contentLabel="Saved Exercises"
      onRequestClose={() => setExercisesModal(false)}
    >
      <div className="exercises-container">
        <ExercisesHead
          tab={tab}
          setTab={setTab}
          setExercisesModal={setExercisesModal}
        />
        {tab === 0 && <ManageExercises exercises={savedExercises} />}
        {tab === 1 && <AddExercises msg={msg} setMsg={setMsg} />}
      </div>
    </Modal>
  );
});

export default Exercises;
