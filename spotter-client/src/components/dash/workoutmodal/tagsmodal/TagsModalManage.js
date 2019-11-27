import React from "react";
import { connect } from "react-redux";
import { FiTrash } from "react-icons/fi";

const TagsModalManage = ({ tags, setActive, setToDelete }) => {
  const styles = {
    width: "250px",
    height: "35px",
    borderRadius: "4px",
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    fontSize: "1.3rem",
    color: "white"
  };

  if (!tags.length) {
    return <div className="no-tags-found">No tags found</div>;
  }

  const handleDelete = id => {
    setActive(3);
    setToDelete(id);
  };

  return (
    <>
      <div className="tag-manage-head">Manage</div>
      {tags.map(tag => (
        <div key={tag._id} className="tag-manage-container">
          <div style={{ background: tag.color, ...styles }}>{tag.content}</div>
          <FiTrash
            onClick={() => handleDelete(tag._id)}
            className="tag-manage-delete"
          />
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

export default connect(mapStateToProps, {})(TagsModalManage);
