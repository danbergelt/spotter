import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { State } from '../../../../../../../../types/State';
import { TagOnWorkout as T } from '../../../../../../../../types/TagOnWorkout';
import { toggleTagAction } from '../../../../../../../../actions/workoutActions';
import styles from '../localutils/loaderStyles';
import Tag from './Tag';

interface TagsState {
  tags: Array<T>;
  isLoading: boolean;
}

// tab - add tag to current workout
const TagsModalAdd: React.FC = () => {
  const { tags, isLoading }: TagsState = useSelector(
    (state: State) => state.tagsReducer
  );
  const onWorkout: Array<T> = useSelector(
    (state: State) => state.workoutReducer.tags
  );

  const dispatch = useDispatch();

  const [hover, setHover] = useState<null | string>(null);

  const toggleTag: (tag: T) => void = useCallback(
    tag => {
      dispatch(toggleTagAction(tag));
    },
    [dispatch]
  );

  if (isLoading) {
    return (
      <Loader
        style={styles}
        type='ThreeDots'
        color='#E9503F'
        height={15}
        width={60}
      />
    );
  }

  if (!tags.length) {
    return <div className='no-tags-found'>No tags found</div>;
  }

  return (
    <>
      <p className='tag-add-head' data-testid='add-tag'>
        Add
      </p>
      {/* map list of created tags */}
      {tags.map(tag => (
        <Tag
          key={tag._id}
          toggleTag={toggleTag}
          onWorkout={onWorkout}
          tag={tag}
          hover={hover}
          setHover={setHover}
        />
      ))}
    </>
  );
};

export default TagsModalAdd;
