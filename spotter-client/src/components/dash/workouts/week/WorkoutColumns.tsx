import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Moment } from 'moment';
import { State } from '../../../../types/State';
import { Workout } from '../../../../types/Workout';
import { fetchWorkouts } from '../../../../actions/fetchWorkoutsActions';
import WorkoutColumn from './WorkoutColumn';
import WorkoutModal from '../../workoutmodal/WorkoutModal';
import { generateWeek, dashHead } from '../../../../utils/momentUtils';
import DashControls from '../DashControls';
import {
  incOrDecAction,
  addWorkoutModalAction,
  viewWorkoutModalAction,
  closeWorkoutModalAction
} from '../../../../actions/globalActions';
import { fetchExercises } from '../../../../actions/fetchExercisesActions';

interface GlobalReducer {
  scope: { value: string; label: string };
  t: string | null;
  timeSpan: number;
}

const WorkoutColumns: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);

  const workouts: Array<Workout> = useSelector(
    (state: State) => state.fetchWorkoutsReducer.workouts
  );
  const { scope, t, timeSpan }: GlobalReducer = useSelector(
    (state: State) => state.globalReducer
  );

  // increment or decrement by one week/day at a time
  const inc = (): void => {
    dispatch(incOrDecAction('inc', timeSpan));
  };
  const dec = (): void => {
    dispatch(incOrDecAction('dec', timeSpan));
  };

  // refetches data upon dashboard state change
  useEffect(() => {
    dispatch(fetchWorkouts(timeSpan, history, scope.value, t));
  }, [timeSpan, history, scope.value, t, dispatch]);

  // opens modal to add a new workout
  const paramsHelper = { setModal, fetchExercises, t, history };
  const openAddWorkoutModal: (date: Moment) => void = useCallback(
    async date => {
      dispatch(addWorkoutModalAction({ ...paramsHelper, date }));
    },
    [dispatch, paramsHelper]
  );

  // opens modal to view a saved workout
  const openViewModal: (workout: Workout, date: Moment) => void = useCallback(
    async (workout, date) => {
      dispatch(viewWorkoutModalAction({ ...paramsHelper, date, workout }));
    },
    [dispatch, paramsHelper]
  );

  // resets state in various parts of application upon workout modal close
  const closeModal: () => void = useCallback(() => {
    setModal(false);
    dispatch(closeWorkoutModalAction());
  }, [dispatch]);

  return (
    <div className='spacer'>
      <DashControls inc={inc} dec={dec} time={timeSpan} month={dashHead} />
      <section className='week-workouts-days'>
        {generateWeek(timeSpan).map((date, i) => (
          <WorkoutColumn
            date={date}
            key={date.format('MMM DD YYYY')}
            i={i}
            openAddWorkoutModal={openAddWorkoutModal}
            openViewModal={openViewModal}
            workouts={workouts}
          />
        ))}
      </section>
      <WorkoutModal time={timeSpan} modal={modal} closeModal={closeModal} />
    </div>
  );
};

export default WorkoutColumns;
