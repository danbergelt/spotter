import React, { memo } from "react";
import * as M from "moment";
import { extendMoment } from "moment-range";
import GridHeadFirstWeek from "./GridHeadFirstWeek";
import GridHead from "./GridHead";
import GridWorkout from "./GridWorkout";
import Popover from "./PopoverContainer";
import { Workout } from "src/types/Workout";
import { P } from "src/types/Grid";

const moment = extendMoment(M);

interface Props {
  date: M.Moment;
  i: number;
  openAddWorkoutModal: (date: M.Moment) => void;
  openViewModal: (workout: Workout, date: M.Moment) => void;
  workouts: Array<Workout>;
  popover: P;
  setPopover: React.Dispatch<React.SetStateAction<P>>;
}

const GridDay: React.FC<Props> = ({
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
              <div style={{ width: "100%" }} key={data._id}>
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
                      onClick={() =>
                        setPopover({
                          open: true,
                          id: date.format("MMM DD YYYY")
                        })
                      }
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
};

export default memo(GridDay);
