import React, { memo } from 'react';
import * as M from 'moment';
import { extendMoment } from 'moment-range';
import { useWindowSize } from 'react-use';
import { Workout } from '../../../../types/Workout';
import { P } from '../../../../types/Grid';
import GridHeadFirstWeek from './GridHeadFirstWeek';
import GridHead from './GridHead';
import GridWorkout from './GridWorkout';
import Popover from './PopoverContainer';

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

// an individual day in the 30 day+ workout grid

const GridDay: React.FC<Props> = ({
  date,
  i,
  openAddWorkoutModal,
  openViewModal,
  workouts,
  popover,
  setPopover
}: Props) => {
  const { width }: { width: number } = useWindowSize();

  return (
    <section
      className='month-grid-day'
      data-testid={date.format('MMM DD YYYY')}
    >
      {i <= 6 ? (
        // in the first week, also include the days of the week (e.g. Monday, Tuesday, etc.)
        // not very DRY to have separate components, possibly pass a notifier prop to change the context, and use a single component?
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
        // if the workout matches this day's date, map over it and render it out into the day
        .filter(el => el.date === date.format('MMM DD YYYY'))
        .map(
          (data, idx) =>
            idx === 0 && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                key={data._id}
              >
                <GridWorkout
                  data={data}
                  openViewModal={openViewModal}
                  date={date}
                />
                {workouts.filter(el => el.date === date.format('MMM DD YYYY'))
                  .length > 1 && (
                  // if there is more than one workout in a day, render a popover to control overflow
                  <Popover
                    workouts={workouts}
                    popover={popover}
                    setPopover={setPopover}
                    openViewModal={openViewModal}
                    date={date}
                  >
                    <button
                      onClick={(): void =>
                        setPopover({
                          open: true,
                          id: date.format('MMM DD YYYY')
                        })
                      } // eslint-disable-line
                      type='button'
                      className='grid-view-more'
                    >
                      {width <= 500 ? 'More' : 'View More'}
                    </button>
                  </Popover>
                )}
              </div>
            )
        )}
    </section>
  );
};

export default memo(GridDay);
