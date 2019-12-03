import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import adjust from "../../../../utils/darkenColorInJS";
import styles from "./tagStyles";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { fetchTags } from "../../../../actions/tagsActions";
import { useHistory } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { UPDATE_TAG } from "../../../../actions/workoutActions";

const TagsModalManage = ({ types, dispatch, setToDelete }) => {
  const tags = useSelector(state => state.tagsReducer.tags);
  const disp = useDispatch();

  const updateTag = useCallback(
    tag => {
      disp({ type: UPDATE_TAG, payload: tag });
    },
    [disp]
  );

  const [hover, setHover] = useState(null);
  const [update, setUpdate] = useState(null);
  const [updateInput, setUpdateInput] = useState("");
  const [err, setErr] = useState("");

  const history = useHistory();

  const handleDelete = tag => {
    dispatch({ type: types.SET_ACTIVE, payload: 3 });
    setToDelete(tag);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUpdateInput("");
    try {
      const res = await axiosWithAuth().put(
        `${process.env.REACT_APP_T_API}/api/auth/tags/${update._id}`,
        { content: updateInput }
      );
      setUpdate(null);
      updateTag(res.data.tag);
      disp(fetchTags(history));
    } catch (error) {
      setErr(error.response.data.error);
    }
  };

  if (!tags.length) {
    return <div className="no-tags-found">No tags found</div>;
  }

  return (
    <>
      <div className="tag-manage-head">Manage</div>
      {err.length ? (
        <div className="tag-delete-err">
          {err}
          <div
            onClick={() => setErr("")}
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          >
            <FiX />
          </div>
        </div>
      ) : null}
      {tags.map(tag => (
        <div key={tag._id}>
          <div className="tag-manage-container">
            <div
              onClick={() => setUpdate(tag)}
              onMouseEnter={() => setHover(tag._id)}
              onMouseLeave={() => setHover(null)}
              style={
                tag._id === hover
                  ? { background: adjust(tag.color, -40), ...styles }
                  : { background: tag.color, ...styles }
              }
              aria-label="tags-manage"
            >
              {tag.content}
            </div>
            <div
              onClick={() => handleDelete(tag)}
              className="tag-manage-delete"
              data-testid="trash-tag"
            >
              Delete
            </div>
          </div>
          <div>
            {update && update._id === tag._id && (
              <form onSubmit={e => handleSubmit(e)}>
                <input
                  autoFocus
                  className="tag-manage-update-input"
                  placeholder="Update tag name..."
                  value={updateInput}
                  onChange={e => setUpdateInput(e.target.value)}
                />
                <button
                  data-testid="save-tag"
                  className="tag-manage-update-submit"
                  type="submit"
                >
                  Save
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default TagsModalManage;
