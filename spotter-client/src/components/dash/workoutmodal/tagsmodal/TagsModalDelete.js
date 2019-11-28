import React, { useState } from "react";
import { fetchTags } from "../../../../actions/tagsActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { FiX } from "react-icons/fi";
import { deleteTag } from "../../../../actions/workoutActions";

const TagsModalDelete = ({ fetchTags, toDelete, setActive, deleteTag: removeFromWorkout }) => {
  const [err, setErr] = useState("");
  const history = useHistory();

  const deleteTag = async () => {
    try {
      await axiosWithAuth().delete(
        `${process.env.REACT_APP_T_API}/api/auth/tags/${toDelete._id}`
      );
      await fetchTags(history);
      removeFromWorkout(toDelete)
      setActive(0);
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
      <div onClick={deleteTag} className="tag-delete-submit">
        Delete Tag
      </div>
    </div>
  );
};

export default connect(null, { fetchTags, deleteTag })(TagsModalDelete);
