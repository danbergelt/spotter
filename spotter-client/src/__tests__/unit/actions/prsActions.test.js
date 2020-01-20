import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  fetchPrs,
  FETCH_PRS_ERROR,
  FETCH_PRS_START,
  FETCH_PRS_SUCCESS
} from '../../../actions/prActions';

const mockStore = configureMockStore([thunk]);

describe('fetch exercises', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates proper action types for successful fetch', async () => {
    axios.get.mockResolvedValue({
      data: { prs: [{ name: 'pr' }] }
    });

    const expectedActions = [
      { type: FETCH_PRS_START },
      { type: FETCH_PRS_SUCCESS, payload: [{ name: 'pr' }] }
    ];

    const store = mockStore({ prs: {} });

    await store.dispatch(fetchPrs('token'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('creates proper action types for rejection', async () => {
    axios.get.mockRejectedValue({
      response: {
        data: {
          error: 'TEST Error'
        }
      }
    });

    const expectedActions = [
      { type: FETCH_PRS_START },
      { type: FETCH_PRS_ERROR, payload: { data: { error: 'TEST Error' } } }
    ];

    const store = mockStore({ err: null });

    await store.dispatch(fetchPrs('token'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
