import axiosWithAuth from "../utils/axiosWithAuth";
import { History } from "history";
import { Dispatch, Action } from "redux";
import { AxiosResponse } from "axios";
import { DELETE_TAG, UPDATE_TAG } from "./workoutActions";
import { SET_ACTIVE, CLOSE_TAG_MODAL, OPEN_TAG_MODAL } from "./optionsActions";
import { TagOnWorkout } from "src/types/TagOnWorkout";

export const FETCH_TAGS_START: string = "FETCH_TAGS_START";
export const FETCH_TAGS_SUCCESS: string = "FETCH_TAGS_SUCCESS";
export const FETCH_TAGS_ERROR: string = "FETCH_TAGS_ERROR";

export const RESET_TAGS: string = "RESET_TAGS";

// fetches tags and resets tags list on modal close

export const fetchTags = (history: History, t: string | null) => {
  return async (dispatch: Dispatch<Action<any>>): Promise<void> => {
    dispatch({ type: FETCH_TAGS_START });
    try {
      const res: AxiosResponse<any> = await axiosWithAuth(t).get(
        `${process.env.REACT_APP_T_API}/api/auth/tags`
      );
      dispatch({ type: FETCH_TAGS_SUCCESS, payload: res.data.tags });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: FETCH_TAGS_ERROR,
          payload: error.response.data.error
        });
      } else {
        history.push("/500");
      }
    }
  };
};

//@desc --> save tag

interface IParamsHelper {
  t: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<
    React.SetStateAction<{
      success?: string | undefined;
      error?: string | undefined;
    }>
  >;
  history: History;
  setName: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  name: string;
}

type TSaveTag = (
  paramsHelper: IParamsHelper
) => (dispatch: any) => Promise<void>;

export const saveTagAction: TSaveTag = paramsHelper => {
  const {
    setLoading,
    t,
    color,
    history,
    setMessage,
    setName,
    name
  } = paramsHelper;

  return async dispatch => {
    setLoading(true);
    try {
      await axiosWithAuth(t).post(
        `${process.env.REACT_APP_T_API}/api/auth/tags`,
        {
          color: color,
          content: name
        }
      );
      setMessage({ success: "New tag created" });
      setLoading(false);
      setName("");
      await dispatch(fetchTags(history, t));
    } catch (error) {
      setMessage(error.response.data);
      setLoading(false);
      setName("");
    }
  };
};

//@desc - set active tags modal tab

type TSetActiveTab = (id: number) => { type: string; payload: number };
export const setActiveTabAction: TSetActiveTab = id => {
  return { type: SET_ACTIVE, payload: id };
};

//@desc --> delete tag

interface IDelTagHelper {
  t: string | null;
  toDelete: Partial<TagOnWorkout>;
  history: History;
  reFetch: Function;
  timeSpan: number;
  scope: { value: string; label: string };
  setErr: Function;
}

type TDeleteTag = (paramsHelper: IDelTagHelper) => (dispatch: any) => void;

export const deleteTagAction: TDeleteTag = paramsHelper => {
  const {
    t,
    toDelete,
    history,
    reFetch,
    timeSpan,
    scope,
    setErr
  } = paramsHelper;

  return async dispatch => {
    try {
      await axiosWithAuth(t).delete(
        `${process.env.REACT_APP_T_API}/api/auth/tags/${toDelete._id}`
      );
      dispatch({
        type: DELETE_TAG,
        payload: toDelete
      });
      dispatch(setActiveTabAction(0));
      await dispatch(fetchTags(history, t));
      await reFetch(timeSpan, history, scope.value, t);
    } catch (error) {
      setErr(error.response.data.error);
    }
  };
};

//@desc --> submit an edited tag

interface IEditTagHelper {
  t: string | null;
  update: Partial<TagOnWorkout>;
  updateInput: string;
  setUpdate: Function;
  history: History;
  setErr: Function;
}

type TEditTag = (paramsHelper: IEditTagHelper) => (dispatch: any) => void;

export const editTagAction: TEditTag = paramsHelper => {
  const { t, update, updateInput, setUpdate, history, setErr } = paramsHelper;
  return async dispatch => {
    try {
      const res: AxiosResponse<any> = await axiosWithAuth(t).put(
        `${process.env.REACT_APP_T_API}/api/auth/tags/${update && update._id}`,
        { content: updateInput }
      );
      setUpdate({});
      dispatch({
        type: UPDATE_TAG,
        payload: res.data.tag
      });
      await dispatch(fetchTags(history, t));
    } catch (error) {
      setErr(error.response.data.error);
    }
  };
};

//@desc --> close tag modal
export const closeTagModalAction = (): { type: string } => {
  return { type: CLOSE_TAG_MODAL };
};

//@desc --> open tag modal
export const openTagModalAction = (): { type: string } => {
  return { type: OPEN_TAG_MODAL };
};
