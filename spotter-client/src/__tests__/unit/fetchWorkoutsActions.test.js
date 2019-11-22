import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import mockWorkoutRes from "../../__testUtils__/mockWorkoutRes";
import {
  fetchWorkouts,
  FETCH_WORKOUTS_START,
  FETCH_WORKOUTS_SUCCESS,
  FETCH_WORKOUTS_ERROR
} from "../../actions/fetchWorkoutsActions";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("fetch workouts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("creates proper action types for successful fetch", async () => {
    axios.post.mockResolvedValue(mockWorkoutRes);

    const expectedActions = [
      { type: FETCH_WORKOUTS_START },
      { type: FETCH_WORKOUTS_SUCCESS, payload: mockWorkoutRes.data.workouts }
    ];

    const store = mockStore({ workouts: [] });

    await store.dispatch(fetchWorkouts(mockWorkoutRes.date));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("proper rejection", async () => {
    const history = createMemoryHistory();

    const err = {
      response: {
        data: {
          error: "TEST Error"
        }
      }
    };

    axios.post.mockRejectedValue(err);

    const expectedActions = [
      { type: FETCH_WORKOUTS_START },
      { type: FETCH_WORKOUTS_ERROR, payload: err.response.data.error }
    ];

    const store = mockStore({ err: null });

    await store.dispatch(fetchWorkouts(null, history));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
