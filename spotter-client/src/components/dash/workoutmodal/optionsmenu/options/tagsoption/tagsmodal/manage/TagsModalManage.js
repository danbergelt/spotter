import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosWithAuth from "../../../../../../../../utils/axiosWithAuth";
import { fetchTags } from "../../../../../../../../actions/tagsActions";
import { useHistory } from "react-router-dom";
import Err from "./Err";
import { UPDATE_TAG } from "../../../../../../../../actions/workoutActions";
import { SET_ACTIVE } from "../../../../../../../../actions/optionsActions";
import Tag from "./Tag";

const TagsModalManage = ({ setToDelete }) => {
  const tags = useSelector(state => state.tagsReducer.tags);
  const dispatch = useDispatch();

  const [hover, setHover] = useState(null);
  const [update, setUpdate] = useState(null);
  const [updateInput, setUpdateInput] = useState("");
  const [err, setErr] = useState("");

  const history = useHistory();

  const handleDelete = useCallback(
    tag => {
      dispatch({ type: SET_ACTIVE, payload: 3 });
      setToDelete(tag);
    },
    [dispatch, setToDelete]
  );

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      setUpdateInput("");
      try {
        const res = await axiosWithAuth().put(
          `${process.env.REACT_APP_T_API}/api/auth/tags/${update &&
            update._id}`,
          { content: updateInput }
        );
        setUpdate(null);
        dispatch({ type: UPDATE_TAG, payload: res.data.tag });
        dispatch(fetchTags(history));
      } catch (error) {
        setErr(error.response.data.error);
      }
    },
    [updateInput, dispatch, history, update]
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
