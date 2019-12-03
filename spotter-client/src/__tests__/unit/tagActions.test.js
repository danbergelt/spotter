import {
  fetchTags,
  FETCH_TAGS_START,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR
} from "../../actions/tagsActions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import mockTagRes from "../../__testUtils__/mockTagRes";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("tag actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("can fetch tags", async () => {
    axios.get.mockResolvedValue(mockTagRes);

    const expectedActions = [
      { type: FETCH_TAGS_START },
      { type: FETCH_TAGS_SUCCESS, payload: mockTagRes.data.tags }
    ];

    const store = mockStore({ tags: {} });

    const history = createMemoryHistory();

    await store.dispatch(fetchTags(history));

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
      { type: FETCH_TAGS_START },
      { type: FETCH_TAGS_ERROR, payload: err.response.data.error }
    ];

    const store = mockStore({ err: null });

    await store.dispatch(fetchTags(history));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
