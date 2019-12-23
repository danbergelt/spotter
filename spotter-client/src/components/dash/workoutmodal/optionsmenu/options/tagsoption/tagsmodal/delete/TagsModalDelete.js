import React, { useState } from "react";
import Err from "./Err";
import { fetchTags } from "../../../../../../../../actions/tagsActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../../../../../../../../utils/axiosWithAuth";
import { DELETE_TAG } from "../../../../../../../../actions/workoutActions";
import { SET_ACTIVE } from "../../../../../../../../actions/optionsActions";

const TagsModalDelete = ({ toDelete }) => {
  const [err, setErr] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const t = useSelector(state => state.globalReducer.t);

  const deleteTag = async () => {
    try {
      await axiosWithAuth(t).delete(
        `${process.env.REACT_APP_T_API}/api/auth/tags/${toDelete._id}`
      );
      await dispatch(fetchTags(history, t));
      dispatch({ type: DELETE_TAG, payload: toDelete });
      dispatch({ type: SET_ACTIVE, payload: 0 });
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
