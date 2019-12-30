import React, { useState } from "react";
import Err from "./Err";
import { fetchTags } from "../../../../../../../../actions/tagsActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../../../../../../../../utils/axiosWithAuth";
import { DELETE_TAG } from "../../../../../../../../actions/workoutActions";
import { SET_ACTIVE } from "../../../../../../../../actions/optionsActions";
import { TagOnWorkout as Tag } from "src/types/TagOnWorkout";
import { fetchToken, State } from "src/types/State";
import reFetch from "src/utils/reFetch";

interface Props {
  toDelete: Partial<Tag>;
}

const TagsModalDelete: React.FC<Props> = ({ toDelete }) => {
  const [err, setErr] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();

  const t: string | null = useSelector(fetchToken);
  const scope = useSelector((state: State) => state.globalReducer.scope);
  const timeSpan = useSelector((state: State) => state.globalReducer.timeSpan);

  const deleteTag: () => Promise<void> = async () => {
    try {
      await axiosWithAuth(t).delete(
        `${process.env.REACT_APP_T_API}/api/auth/tags/${toDelete._id}`
      );
      dispatch<{ type: string; payload: Partial<Tag> }>({
        type: DELETE_TAG,
        payload: toDelete
      });
      dispatch<{ type: string; payload: number }>({
        type: SET_ACTIVE,
        payload: 0
      });
      await dispatch(fetchTags(history, t));
      await reFetch(timeSpan, history, scope.value, t);
    } catch (error) {
      setErr(error.response.data.error);
    }
  };

  return (
    <div className="tag-delete-container">
      <div className="tag-delete">
        Are you sure you want to delete this tag? There is no undoing this
        action.
      </div>
      {err.length ? <Err err={err} setErr={setErr} /> : null}
      <div onClick={deleteTag} className="tag-delete-submit">
        Delete Tag
      </div>
    </div>
  );
};

export default TagsModalDelete;
