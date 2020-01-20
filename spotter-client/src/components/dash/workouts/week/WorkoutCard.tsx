import React from 'react';
import { FiAlignLeft } from 'react-icons/fi';
import { useWindowSize } from 'react-use';
import { Workout } from '../../../../types/Workout';
import { TagOnWorkout } from '../../../../types/TagOnWorkout';

// card that renders under each column in weekly workout view
// data represents data for each workout

interface Props {
  data: Workout;
}

const WorkoutCard: React.FC<Props> = ({ data }: Props) => {
  const { width } = useWindowSize();

  const dynamicTitleHelper = (): string => {
    if (width <= 500 && data.title.length > 4) {
      return `${data.title.slice(0, 4)}...`;
    }

    return data.title;
  };

  const dynamicTagHelper = (tag: TagOnWorkout): string => {
    if (width <= 750 && tag.content.length > 4) {
      return `${tag.content.slice(0, 4)}...`.toUpperCase();
    }

    return data.title.toUpperCase();
  };

  return (
    <>
      <p data-testid='workout-title' className='workout-card-title'>
        {dynamicTitleHelper()}
      </p>
      {data.notes || data.exercises.length ? (
        <FiAlignLeft className='workout-card-notes-ind' />
      ) : null}
      <section className='workout-card-tag-container'>
        {data.tags.map(tag => (
          <p
            className='workout-card-tag'
            key={tag._id}
            style={{ background: tag.color }}
          >
            {dynamicTagHelper(tag)}
          </p>
        ))}
      </section>
    </>
  );
};

export default WorkoutCard;
