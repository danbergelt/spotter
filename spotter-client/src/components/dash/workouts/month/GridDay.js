import React from "react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import GridHeadFirstWeek from "./GridHeadFirstWeek";
import GridHead from "./GridHead";
import GridWorkout from "./GridWorkout";
import Popover from "./PopoverContainer";

const moment = extendMoment(Moment);

const GridDay = React.memo(
  ({
    date,
    i,
    openAddWorkoutModal,
    openViewModal,
    workouts,
    popover,
    setPopover
  }) => {
    return (
      <div className="month-grid-day" data-testid={date.format("MMM DD YYYY")}>
        {i <= 6 ? (
          <GridHeadFirstWeek
            moment={moment}
            openAddWorkoutModal={openAddWorkoutModal}
            i={i}
            date={date}
          />
        ) : (
          <GridHead
            moment={moment}
            openAddWorkoutModal={openAddWorkoutModal}
            date={date}
          />
        )}
        {workouts
          .filter(el => el.date === date.format("MMM DD YYYY"))
          .map(
            (data, i) =>
              i === 0 && (
                <div style={{width: "100%"}} key={data._id}>
                  <GridWorkout
                    data={data}
                    openViewModal={openViewModal}
                    date={date}
                  />
                  {workouts.filter(el => el.date === date.format("MMM DD YYYY"))
                    .length > 1 && (
                    <Popover
                      workouts={workouts}
                      popover={popover}
                      setPopover={setPopover}
                      openViewModal={openViewModal}
                      date={date}
                    >
                      <div
                        onClick={() => setPopover(true)}
                        className="grid-view-more"
                      >
                        View More
                      </div>
                    </Popover>
                  )}
                </div>
              )
          )}
      </div>
    );
  }
);

export default GridDay;
