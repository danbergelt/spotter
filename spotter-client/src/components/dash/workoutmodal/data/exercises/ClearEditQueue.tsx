import React from "react";
import { useDispatch } from "react-redux";
import { resetQueueAction } from "../../../../../actions/workoutActions";

const ClearEditQueue: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(resetQueueAction())}
      className="workout-data-exercises-editing"
    >
      Clear
    </div>
  );
};

export default ClearEditQueue;
