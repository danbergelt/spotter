import React, { useCallback } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setExercisesModalAction } from '../../../../../../actions/optionsActions';
import Exercises from './Exercises';

interface Props {
  iconClass: string;
}

const ExerciseOption: React.FC<Props> = ({ iconClass }: Props) => {
  const dispatch = useDispatch();

  const setExercisesModal: (state: boolean) => void = useCallback(
    state => {
      dispatch(setExercisesModalAction(state));
    },
    [dispatch]
  );

  return (
    <>
      <div
        role='button'
        onClick={(): void => setExercisesModal(true)}
        data-testid='exercises-modal'
        className='add-workout-options-button'
      >
        <FiTrendingUp className={iconClass} />
        Exercises
      </div>
      <Exercises setExercisesModal={setExercisesModal} />
    </>
  );
};

export default ExerciseOption;
