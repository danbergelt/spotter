import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { tagStyles } from "./localutils/tagstyles";

const WorkoutTags = ({ tags }) => {
  const [tagsInState, setTagsInState] = useState([]);

  useEffect(() => {
    setTagsInState(tags);
  }, [tags]);

  return (
    <div className="workout-data-tags">
      <h1 className="workout-data-tags-head">TAGS</h1>
      <div className="workout-data-tags-container">
        {!tagsInState.length ? (
          <p
            className="workout-data-tags-head"
            style={{ fontSize: "1.2rem", margin: 0 }}
          >
            No tags
          </p>
        ) : (
          tagsInState.map(tag => (
            <div
              data-testid="mapped-tag"
              style={tagStyles(tag.color)}
              key={tag._id}
            >
              {tag.content.toUpperCase()}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tags: state.workoutReducer.tags
  };
};

export default connect(mapStateToProps, {})(WorkoutTags);
