import React from 'react';
import PrivateRoute from '../../../components/auth/PrivateRoute';
import Dashboard from '../../../pages/Dashboard';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import { ADD_TOKEN } from '../../../actions/addTokenActions';
import axios from 'axios';
import { wait } from '@testing-library/react';

test('unauthenticated user redirects to login', async () => {
  const { history, container, queryByTestId } = wrapper(
    reducer,
    <PrivateRoute component={Dashboard} />
  );
  expect(queryByTestId(/modal-click/i)).toBeFalsy();
});

test('authenticated user passes through to protected component', () => {
  axios.post.mockResolvedValue({});
  const { history, store, queryByTestId } = wrapper(
    reducer,
    <PrivateRoute component={Dashboard} />
  );

  store.dispatch({ type: ADD_TOKEN, payload: 'token' });

  expect(queryByTestId(/modal-click/i)).toBeTruthy();
});
