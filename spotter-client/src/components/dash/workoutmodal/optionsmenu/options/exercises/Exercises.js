import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import ExercisesHead from "./ExercisesHead";
import ManageExercises from "./ManageExercises";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const Exercises = React.memo(({ setExercisesModal }) => {
  const modalState = useSelector(state => state.optionsReducer.exercises);
  const exercises = useSelector(state => state.fetchExercisesReducer.exercises);
  const [tab, setTab] = useState(0);

  return (
    <Modal
      style={styles}
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
        {tab === 0 && <ManageExercises exercises={exercises} />}
      </div>
    </Modal>
  );
});

export default Exercises;
