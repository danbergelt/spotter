import React, { useCallback, memo } from "react";
import Modal from "react-modal";
import ConfirmDeleteHead from "./ConfirmDeleteHead";
import { styles } from "./confirmDeleteStyles";
import { useSelector, useDispatch } from "react-redux";
import { SET_CONFIRM_DELETE } from "../../../../../../../actions/optionsActions";
import { DELETE_WORKOUT } from "../../../../../../../actions/fetchWorkoutsActions";
import ConfirmDeleteBody from "./ConfirmDeleteBody";
import { State } from "src/types/State";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

interface Props {
  workoutId: string | null;
  closeParentModal: () => void;
}

// a modal that provides a layer of protection before deleting a workout
const ConfirmDelete: React.FC<Props> = ({ workoutId, closeParentModal }) => {

  const fetchConfirmDelete = (state: State) =>
    state.optionsReducer.confirmDelete;
  const confirmDelete: boolean = useSelector(fetchConfirmDelete);

  const dispatch = useDispatch();

  const close: () => void = useCallback(() => {
    dispatch<{type: string, payload: boolean}>({ type: SET_CONFIRM_DELETE, payload: false });
  }, [dispatch]);

  const dispatchDelete: (id: string) => void = useCallback(
    id => {
      dispatch<{type: string, payload: string}>({ type: DELETE_WORKOUT, payload: id });
    },
    [dispatch]
  );

  return (
    <Modal
      style={styles}
      isOpen={confirmDelete}
      onRequestClose={close}
      contentLabel="Confirm Delete Workout"
    >
      <div className="delete-container">
        <ConfirmDeleteHead close={close} />
        <ConfirmDeleteBody
          onDelete={dispatchDelete}
          workoutId={workoutId}
          closeParentModal={closeParentModal}
          onClose={close}
        />
      </div>
    </Modal>
  );
};

export default memo(ConfirmDelete);
