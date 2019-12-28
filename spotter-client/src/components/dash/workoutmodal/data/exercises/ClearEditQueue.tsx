import React from "react";
import { useDispatch } from "react-redux";
import { RESET_QUEUE } from "../../../../../actions/workoutActions";

const ClearEditQueue: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch<{ type: string }>({ type: RESET_QUEUE })}
      className="workout-data-exercises-editing"
    >
      Clear
    </div>
  );
};

export default ClearEditQueue;
