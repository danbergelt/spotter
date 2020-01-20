import React from 'react';
import { FiX } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../types/State';
import { addTitleAction } from '../../../../actions/workoutActions';

interface Props {
  closeModal: () => void;
}

const WorkoutTitle: React.FC<Props> = ({ closeModal }: Props) => {
  const title: string = useSelector(
    (state: State) => state.workoutReducer.title
  );

  const dispatch = useDispatch();

  return (
    <section className='workout-modal-head'>
      <div className='workout-modal-head-left'>
        <FaCircle className='workout-spotter-logo' />
        <input
          data-testid='inp'
          placeholder='Click to enter a title...'
          value={title}
          onChange={(e): { type: string; payload: string } =>
            dispatch(addTitleAction(e.target.value))
          } // eslint-disable-line
          className='workout-title'
        />
      </div>
      <div role='button' onClick={closeModal} className='workout-exit-modal'>
        <FiX data-testid='exit-modal' />
      </div>
    </section>
  );
};

export default WorkoutTitle;
