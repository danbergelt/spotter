import React from "react";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RESET_QUEUE } from "../../../../../actions/workoutActions";

const ClearEditQueue = () => {
  const dispatch = useDispatch();

  const queued = useSelector(state => state.workoutReducer.queue);

  return (
    !isEmpty(queued) && (
      <div
        onClick={() => dispatch({ type: RESET_QUEUE })}
        className="workout-data-exercises-editing"
      >
        Clear
      </div>
    )
  );
};

export default ClearEditQueue;
