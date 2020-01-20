import React, { memo } from 'react';
import { Moment } from 'moment';
import { Workout } from '../../../../types/Workout';
import WorkoutColumnContent from './WorkoutColumnContent';

import WorkoutCard from './WorkoutCard';

interface Props {
  date: Moment;
  i: number;
  openAddWorkoutModal: (date: Moment) => void;
  openViewModal: (workout: Workout, date: Moment) => void;
  workouts: Array<Workout>;
}

const WorkoutColumn: React.FC<Props> = ({
  date,
  i,
  openAddWorkoutModal,
  openViewModal,
  workouts
}: Props) => {
  return (
    <div role='button' className='week-workouts-column'>
      <WorkoutColumnContent
        date={date}
        i={i}
        openAddWorkoutModal={(): void => openAddWorkoutModal(date)}
      />
      <div>
        {/* filter workouts for workouts matching this date */}
        {workouts
          .filter(el => el.date === date.format('MMM DD YYYY'))
          .map(data => (
            <button
              className='workout-card-container'
              onClick={(): void => openViewModal(data, date)}
              key={data._id}
              type='button'
            >
              <WorkoutCard data={data} />
            </button>
          ))}
      </div>
    </div>
  );
};

export default memo(WorkoutColumn);
