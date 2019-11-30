import React from "react";
import TagsModalManage from "../../components/dash/workoutmodal/tagsmodal/TagsModalManage";
import TagsModalDelete from "../../components/dash/workoutmodal/tagsmodal/TagsModalDelete";
import mockTagRes from "../../__testUtils__/mockTagRes";
import { FETCH_TAGS_SUCCESS } from "../../actions/tagsActions";
import { cleanup, fireEvent } from "@testing-library/react";
import wrapper from "../../__testUtils__/wrapper";
import Modal from "react-modal";
import axios from "axios";
import reducer from "../../reducers/index";
import { act } from "react-dom/test-utils";

describe("tag modal manage functionality", () => {
  Modal.setAppElement(document.createElement("div"));
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  test("modal displays default state if no tags", () => {
    const { queryByText } = wrapper(reducer, <TagsModalManage />);
    expect(queryByText(/no tags found/i)).toBeTruthy();
  });

  test("modal displays tag if tag found", () => {
    const { getByText, store } = wrapper(reducer, <TagsModalManage />);

    store.dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: [{ content: "content", _id: 1 }]
    });

    expect(getByText(/content/i)).toBeTruthy();
  });

  test("can edit tag name", () => {
    const { getByText, store } = wrapper(reducer, <TagsModalManage />);

    store.dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: [{ content: "content", _id: 1 }]
    });

    expect(getByText(/content/i)).toBeTruthy();

    store.dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: [{ content: "changed", _id: 1 }]
    });

    expect(getByText(/changed/i)).toBeTruthy();
  });

  test("tag name error checking", async () => {
    axios.put.mockRejectedValue({ response: { data: { error: "Rejected" } } });
    const { store, queryByText, getByTestId, getByText } = wrapper(
      reducer,
      <TagsModalManage />
    );

    store.dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: [{ content: "content", _id: 1 }]
    });

    expect(getByText(/content/i)).toBeTruthy();
    fireEvent.click(getByText(/content/i));

    // reject response, display message on screen
    await act(async () => {
      fireEvent.click(getByTestId(/save-tag/i));
    });
    expect(queryByText(/Rejected/i)).toBeTruthy();
  });

  test("delete a tag", async () => {
    const { getByText, store, queryByText } = wrapper(
      reducer,
      <TagsModalManage />
    );

    store.dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: [{ content: "content", _id: 1 }]
    });

    expect(getByText(/content/i)).toBeTruthy();

    store.dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: []
    });

    expect(queryByText(/no tags found/i)).toBeTruthy();
  });
});
