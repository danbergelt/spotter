import React from 'react';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import Modal from 'react-modal';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import WorkoutColumns from '../../../components/dash/workouts/week/WorkoutColumns';
import wrapper from '../../../__testUtils__/wrapper';
import mockWorkoutRes from '../../../__testUtils__/mockWorkoutRes';
import { FETCH_WORKOUTS_SUCCESS } from '../../../actions/fetchWorkoutsActions';

import { reducer } from '../../../reducers/index';

describe('can close modal on delete click', () => {
  // initial setup
  afterEach(cleanup);
  Modal.setAppElement(document.createElement('div'));

  test('can close modal on delete click', async () => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({});
    const { store, history, getByTestId, queryByText } = wrapper(
      reducer,
      <WorkoutColumns />
    );

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: mockWorkoutRes.data.workouts
    });

    history.push('/dashboard');

    fireEvent.click(getByTestId(/modal-click/i));

    await act(async () => {
      await fireEvent.click(getByTestId(/del-workout/i));
    });

    expect(queryByText(/notes for workout/i)).toBeFalsy();
  });

  test('can delete workout', async () => {
    axios.post.mockResolvedValue({});
    const { store, history, getByTestId, queryByText, getByText } = wrapper(
      reducer,
      <WorkoutColumns />
    );

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: mockWorkoutRes.data.workouts
    });

    history.push('/dashboard');

    fireEvent.click(getByText(/workout for testing/i));

    await act(async () => {
      await fireEvent.click(getByTestId(/del-workout/i));
      await fireEvent.click(getByTestId(/conf-del/i));
    });

    await wait(() => expect(queryByText(/workout for testing/i)).toBeFalsy());
  });
});
