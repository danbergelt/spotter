import React from "react";
import { FiX } from "react-icons/fi";

const ViewMoreContent = React.memo(
  ({ setPopover, workouts, openViewModal, date }) => {
    const handlePopover = workout => {
      setPopover(false);
      openViewModal(workout, date);
    };

    return (
      <>
        <div className="close-popover" onClick={() => setPopover(false)}>
          <FiX />
        </div>
        {workouts.map(workout => (
          <div
            onClick={() => handlePopover(workout)}
            className="view-more-workouts-container"
            key={workout._id}
          >
            <div
              style={{ background: workout.tags[0] && workout.tags[0].color }}
              className="view-more-workout"
            >
              {workout.title}
            </div>
          </div>
        ))}
      </>
    );
  }
);

export default ViewMoreContent;
