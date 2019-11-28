import React from "react";
import TagsModal from "../../components/dash/workoutmodal/tagsmodal/TagsModal";
import WorkoutOptions from "../../components/dash/workoutmodal/options/WorkoutOptions";
import mockTagRes from "../../__testUtils__/mockTagRes";
import mockUpdateTagRes from "../../__testUtils__/mockUpdateTagRes";
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
    const { queryByText, getByText, getByTestId, debug } = wrapper(
      reducer,
      <WorkoutOptions>
        <TagsModal modal={true} />
      </WorkoutOptions>
    );
    fireEvent.click(getByTestId(/tags-modal/i));

    fireEvent.click(getByText(/manage/i));
    expect(queryByText(/no tags found/i)).toBeTruthy();
  });

  test("modal displays tag if tag found", async () => {
    axios.get.mockResolvedValueOnce(mockTagRes);
    axios.post.mockResolvedValue(mockTagRes);
    const { getByText, getByTestId, getAllByLabelText, findByText } = wrapper(
      reducer,
      <WorkoutOptions>
        <TagsModal modal={true} />
      </WorkoutOptions>
    );
    // open modal, navigate to colors tab, click on color
    fireEvent.click(getByTestId(/tags-modal/i));
    fireEvent.click(getByText(/create/i));
    const colors = getAllByLabelText(/tag-colors/i);
    fireEvent.click(colors[1]);

    // create tag
    await act(async () => {
      fireEvent.click(getByText(/create tag/i));
    });

    // await response
    await findByText(/new tag created/i);

    // confirm that added tag appears in the manage tab
    fireEvent.click(getByText(/manage/i));
    const managedColors = getAllByLabelText(/tags-manage/i);
    expect(managedColors.length).toEqual(1);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  test("can edit tag name", async () => {
    axios.get.mockResolvedValue(mockTagRes);
    axios.put.mockResolvedValue(mockUpdateTagRes);
    const {
      getByText,
      getByTestId,
      getAllByLabelText,
      queryByPlaceholderText,
      findByText,
      container,
      store
    } = wrapper(
      reducer,
      <WorkoutOptions>
        <TagsModal modal={true} />
      </WorkoutOptions>
    );

    // open modal, navigate to colors tab, click on color
    fireEvent.click(getByTestId(/tags-modal/i));
    fireEvent.click(getByText(/create/i));
    const colors = getAllByLabelText(/tag-colors/i);
    fireEvent.click(colors[1]);

    // create tag
    await act(async () => {
      fireEvent.click(getByText(/create tag/i));
    });

    // await response
    await findByText(/new tag created/i);

    // navigate to manage tab, click on tag, display update input
    fireEvent.click(getByText(/manage/i));
    const managedColors = getAllByLabelText(/tags-manage/i);
    fireEvent.click(managedColors[0]);
    expect(queryByPlaceholderText(/update tag name.../i)).toBeTruthy();

    // update name
    fireEvent.change(queryByPlaceholderText(/update tag name.../i), {
      target: { value: "test tag" }
    });
    expect(container.innerHTML).toMatch(/test tag/i);

    // submit tag, confirm successful response
    await act(async () => {
      fireEvent.click(getByTestId(/save-tag/i));
    });
    expect(queryByPlaceholderText(/update tag name.../i)).toBeFalsy();
  });

  test("tag name error checking", async () => {
    axios.get.mockResolvedValue(mockTagRes);
    axios.put.mockRejectedValue({ response: { data: { error: "Rejected" } } });
    const {
      getByText,
      getByTestId,
      getAllByLabelText,
      queryByPlaceholderText,
      findByText,
      container,
      queryByText
    } = wrapper(
      reducer,
      <WorkoutOptions>
        <TagsModal modal={true} />
      </WorkoutOptions>
    );

    // open modal, navigate to colors tab, click on color
    fireEvent.click(getByTestId(/tags-modal/i));
    fireEvent.click(getByText(/create/i));
    const colors = getAllByLabelText(/tag-colors/i);
    fireEvent.click(colors[1]);

    // create tag
    await act(async () => {
      fireEvent.click(getByText(/create tag/i));
    });

    // await response
    await findByText(/new tag created/i);

    // navigate to manage tab, click on tag, display update input
    fireEvent.click(getByText(/manage/i));
    const managedColors = getAllByLabelText(/tags-manage/i);
    fireEvent.click(managedColors[0]);
    expect(queryByPlaceholderText(/update tag name.../i)).toBeTruthy();

    // update name
    fireEvent.change(queryByPlaceholderText(/update tag name.../i), {
      target: { value: "test tag" }
    });
    expect(container.innerHTML).toMatch(/test tag/i);

    // reject response, display message on screen
    await act(async () => {
      fireEvent.click(getByTestId(/save-tag/i));
    });
    expect(queryByText(/Rejected/i)).toBeTruthy();
  });

  test("delete a tag", async () => {
    axios.get.mockResolvedValue(mockTagRes);
    const {
      getByText,
      getByTestId,
      getAllByLabelText,
      getAllByTestId,
      queryByTestId,
      findByText,
      container,
      queryByText
    } = wrapper(
      reducer,
      <WorkoutOptions>
        <TagsModal modal={true} />
      </WorkoutOptions>
    );

    // open modal, navigate to colors tab, click on color
    fireEvent.click(getByTestId(/tags-modal/i));
    fireEvent.click(getByText(/create/i));
    const colors = getAllByLabelText(/tag-colors/i);
    fireEvent.click(colors[1]);

    // create tag
    await act(async () => {
      fireEvent.click(getByText(/create tag/i));
    });

    // await response
    await findByText(/new tag created/i);

    // navigate to manage tab, click on delete icon
    fireEvent.click(getByText(/manage/i));
    const trash = getAllByTestId(/trash-tag/i);
    fireEvent.click(trash[0]);

    // confirm user is on delete page, delete tag, confirm redirected successful response
    expect(queryByText(/delete tag/i)).toBeTruthy();
    await act(async () => {
      fireEvent.click(getByText(/delete tag/i));
    });
    expect(queryByTestId(/add-tag/i)).toBeTruthy();
  });
});
