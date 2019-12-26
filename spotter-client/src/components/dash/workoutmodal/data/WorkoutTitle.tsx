import React from "react";
import { FiX } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ADD_WORKOUT_TITLE } from "../../../../actions/workoutActions";
import { State } from "src/types/State";

interface Props {
  closeModal: () => void;
}

const WorkoutTitle: React.FC<Props> = ({ closeModal }) => {
  const fetchTitle = (state: State) => state.workoutReducer.title;
  const title: string = useSelector(fetchTitle);

  const dispatch = useDispatch();

  return (
    <div className="workout-modal-head">
      <div className="workout-modal-head-left">
        <FaCircle className="workout-spotter-logo" />
        <input
          data-testid="inp"
          placeholder={"Click to enter a title..."}
          value={title}
          onChange={e =>
            dispatch<{ type: string; payload: string }>({
              type: ADD_WORKOUT_TITLE,
              payload: e.target.value
            })
          }
          className="workout-title"
        />
      </div>
      <div onClick={closeModal} className="workout-exit-modal">
        <FiX data-testid="exit-modal" />
      </div>
    </div>
  );
};

export default WorkoutTitle;
