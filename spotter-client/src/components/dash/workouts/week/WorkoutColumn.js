import React from "react";
import WorkoutColumnContent from "./WorkoutColumnContent";

import WorkoutCard from "./WorkoutCard";

const WorkoutColumn = React.memo(
  ({ date, i, openAddWorkoutModal, openViewModal, workouts }) => {
    return (
      <div className="week-workouts-column">
        <WorkoutColumnContent
          date={date}
          i={i}
          openAddWorkoutModal={() => openAddWorkoutModal(date)}
        />
        <div>
          {/* filter workouts for workouts matching this date */}
          {workouts
            .filter(el => el.date === date.format("MMM DD YYYY"))
            .map(data => (
              <div
                className="workout-card-container"
                onClick={() => openViewModal(data, date)}
                key={data._id}
              >
                <WorkoutCard data={data} />
              </div>
            ))}
        </div>
      </div>
    );
  }
);

export default WorkoutColumn;
