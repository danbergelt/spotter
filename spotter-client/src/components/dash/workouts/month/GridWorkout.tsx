import React, { memo } from 'react';
import { Moment } from 'moment';
import { useWindowSize } from 'react-use';
import { Workout } from '../../../../types/Workout';

interface Props {
  data: Workout;
  openViewModal: (workout: Workout, date: Moment) => void;
  date: Moment;
}

// prompt to view a pre-existing workout

const GridWorkout: React.FC<Props> = ({ data, openViewModal, date }: Props) => {
  const { width }: { width: number } = useWindowSize();

  return (
    <button
      style={{ background: data.tags[0] && data.tags[0].color }}
      className='month-grid-workout'
      type='button'
      onClick={(): void => openViewModal(data, date)}
      key={data._id}
    >
      {width <= 800 && data.title.length > 5
        ? `${data.title.slice(0, 4)}...`
        : data.title}
    </button>
  );
};

export default memo(GridWorkout);
