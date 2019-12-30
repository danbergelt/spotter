import React, { useCallback, memo } from "react";
import Modal from "react-modal";
import ConfirmDeleteHead from "./ConfirmDeleteHead";
import { styles } from "./confirmDeleteStyles";
import { useSelector, useDispatch } from "react-redux";
import { setConfirmDeleteAction } from "../../../../../../../actions/optionsActions";
import ConfirmDeleteBody from "./ConfirmDeleteBody";
import { State } from "src/types/State";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

interface Props {
  workoutId: string | null;
  closeParentModal: () => void;
}

// a modal that provides a layer of protection before deleting a workout
const ConfirmDelete: React.FC<Props> = ({ workoutId, closeParentModal }) => {
  const confirmDelete: boolean = useSelector(
    (state: State) => state.optionsReducer.confirmDelete
  );

  const dispatch = useDispatch();

  const closeConfirmDelete: () => void = useCallback(() => {
    dispatch(setConfirmDeleteAction(false));
  }, [dispatch]);

  return (
    <Modal
      style={styles}
      isOpen={confirmDelete}
      onRequestClose={closeConfirmDelete}
      contentLabel="Confirm Delete Workout"
    >
      <div className="delete-container">
        <ConfirmDeleteHead closeConfirmDelete={closeConfirmDelete} />
        <ConfirmDeleteBody
          workoutId={workoutId}
          closeParentModal={closeParentModal}
          closeConfirmDelete={closeConfirmDelete}
        />
      </div>
    </Modal>
  );
};

export default memo(ConfirmDelete);
