import React from 'react';
import App from '../../../App';
import { cleanup, fireEvent, wait, findByText } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import axios from 'axios';

describe('can close modal on delete click', () => {
  // initial setup
  afterEach(cleanup);

  test('open and close contact modal', async () => {
    axios.get.mockResolvedValue({ data: { token: null } });
    const {
      store,
      history,
      getByTestId,
      queryByTestId,
      getByText,
      queryByText,
      debug
    } = wrapper(reducer, <App />);

    await wait(() => expect(queryByText(/lifting pal/i)).toBeTruthy());

    expect(queryByTestId(/contact-form/i)).toBeFalsy();

    fireEvent.click(getByTestId(/contact-button/i));

    await wait(() => expect(queryByTestId(/contact-form/i)).toBeTruthy());

    fireEvent.click(getByTestId(/contact-button/i));

    await wait(() => expect(queryByTestId(/contact-form/i)).toBeFalsy());
  });
});
