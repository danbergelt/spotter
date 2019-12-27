import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosWithAuth from "../../../../../../../../utils/axiosWithAuth";
import { fetchTags } from "../../../../../../../../actions/tagsActions";
import { useHistory } from "react-router-dom";
import Err from "./Err";
import { UPDATE_TAG } from "../../../../../../../../actions/workoutActions";
import { SET_ACTIVE } from "../../../../../../../../actions/optionsActions";
import Tag from "./Tag";
import { TagOnWorkout as T } from "../../../../../../../../types/TagOnWorkout";
import { State } from "src/types/State";
import { AxiosResponse } from "axios";

interface Props {
  setToDelete: React.Dispatch<React.SetStateAction<Partial<T>>>;
}

const TagsModalManage: React.FC<Props> = ({ setToDelete }) => {
  const tagsFromState = (state: State) => state.tagsReducer.tags;
  const tags: Array<T> = useSelector(tagsFromState);

  const fetchToken = (state: State) => state.globalReducer.t;
  const t: string | null = useSelector(fetchToken);

  const dispatch = useDispatch();

  const [hover, setHover] = useState<null | string>(null);
  const [update, setUpdate] = useState<Partial<T>>({});
  const [updateInput, setUpdateInput] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const history = useHistory();

  const handleDelete: (tag: T) => void = useCallback(
    tag => {
      dispatch<{ type: string; payload: number }>({
        type: SET_ACTIVE,
        payload: 3
      });
      setToDelete(tag);
    },
    [dispatch, setToDelete]
  );

  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void = useCallback(
    async e => {
      e.preventDefault();
      setUpdateInput("");
      try {
        const res: AxiosResponse<any> = await axiosWithAuth(t).put(
          `${process.env.REACT_APP_T_API}/api/auth/tags/${update &&
            update._id}`,
          { content: updateInput }
        );
        setUpdate({});
        dispatch<{type: string, payload: T}>({ type: UPDATE_TAG, payload: res.data.tag });
        dispatch(fetchTags(history, t));
      } catch (error) {
        setErr(error.response.data.error);
      }
    },
    [updateInput, dispatch, history, update, t]
  );

  if (!tags.length) {
    return <div className="no-tags-found">No tags found</div>;
  }

  return (
    <>
      <div className="tag-manage-head">Manage</div>
      {err.length ? <Err err={err} setErr={setErr} /> : null}
      {tags.map(tag => (
        <Tag
          key={tag._id}
          tag={tag}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          hover={hover}
          setHover={setHover}
          update={update}
          setUpdate={setUpdate}
          updateInput={updateInput}
          setUpdateInput={setUpdateInput}
        />
      ))}
    </>
  );
};

export default TagsModalManage;
