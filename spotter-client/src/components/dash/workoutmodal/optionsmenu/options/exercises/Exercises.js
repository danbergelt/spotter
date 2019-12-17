import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { styles } from "./styles";
import ExercisesHead from "./ExercisesHead";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const Exercises = React.memo(({ setExercisesModal }) => {
  const modalState = useSelector(state => state.optionsReducer.exercises);

  const exercises = useSelector(state => state.fetchExercisesReducer.exercises);

  return (
    <Modal
      style={styles}
      isOpen={modalState}
      contentLabel="Saved Exercises"
      onRequestClose={() => setExercisesModal(false)}
    >
      <div className="exercises-container">
        <ExercisesHead setExercisesModal={setExercisesModal} />
        {!exercises.length && <div>No exercises found</div>}
        {exercises.map(el => (
          <div key={el._id}>{el.name}</div>
        ))}
      </div>
    </Modal>
  );
});

export default Exercises;
