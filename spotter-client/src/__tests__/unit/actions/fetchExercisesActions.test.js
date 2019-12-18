import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import mockWorkoutRes from "../../../__testUtils__/mockWorkoutRes";
import {
  fetchExercises,
  FETCH_EXERCISES_ERROR,
  FETCH_EXERCISES_SUCCESS
} from "../../../actions/fetchExercisesActions";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("fetch exercises", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("creates proper action types for successful fetch", async () => {
    const history = createMemoryHistory();
    axios.get.mockResolvedValue({
      data: { exercises: [{ name: "name", _id: 1 }] }
    });

    const expectedActions = [
      { type: FETCH_EXERCISES_SUCCESS, payload: [{ name: "name", _id: 1 }] }
    ];

    const store = mockStore({ exercises: [] });

    await store.dispatch(fetchExercises(history));

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

    axios.get.mockRejectedValue(err);

    const expectedActions = [
      { type: FETCH_EXERCISES_ERROR, payload: err.response.data.error }
    ];

    const store = mockStore({ err: null });

    await store.dispatch(fetchExercises(history));

    expect(store.getActions()).toEqual(expectedActions);
  });
});