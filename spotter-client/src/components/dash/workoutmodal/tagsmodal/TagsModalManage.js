import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { FiTrash } from "react-icons/fi";
import adjust from "../../../../utils/darkenColorInJS";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { fetchTags } from "../../../../actions/tagsActions";
import { useHistory } from "react-router-dom";
import { FiX } from "react-icons/fi";

const TagsModalManage = ({ tags, setActive, setToDelete, fetchTags }) => {
  const [hover, setHover] = useState(null);
  const [update, setUpdate] = useState(null);
  const [updateInput, setUpdateInput] = useState("");
  const [err, setErr] = useState("");

  const inputRef = useRef();

  const history = useHistory();

  const styles = {
    width: "250px",
    height: "35px",
    borderRadius: "4px",
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    fontSize: "1.3rem",
    color: "white",
    cursor: "pointer"
  };

  useEffect(() => {
    if (update && update.length) {
      inputRef.current.focus();
    }
  }, [update]);

  const handleDelete = id => {
    setActive(3);
    setToDelete(id);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUpdateInput("");
    try {
      await axiosWithAuth().put(
        `${process.env.REACT_APP_T_API}/api/auth/tags/${update}`,
        { content: updateInput }
      );
      setUpdate(null);
      fetchTags(history);
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
              onClick={() => setUpdate(tag._id)}
              onMouseEnter={() => setHover(tag.color)}
              onMouseLeave={() => setHover(null)}
              style={
                tag.color === hover
                  ? { background: adjust(tag.color, -40), ...styles }
                  : { background: tag.color, ...styles }
              }
              aria-label="tags-manage"
            >
              {tag.content}
            </div>
            <FiTrash
              onClick={() => handleDelete(tag._id)}
              className="tag-manage-delete"
              data-testid="trash-tag"
            />
          </div>
          <div>
            {update === tag._id && (
              <form onSubmit={e => handleSubmit(e)}>
                <input
                  ref={inputRef}
                  className="tag-manage-update-input"
                  placeholder="Update tag name..."
                  value={updateInput}
                  onChange={e => setUpdateInput(e.target.value)}
                />
                <button data-testid="save-tag" className="tag-manage-update-submit" type="submit">
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

const mapStateToProps = state => {
  return {
    tags: state.tagsReducer.tags
  };
};

export default connect(mapStateToProps, { fetchTags })(TagsModalManage);
