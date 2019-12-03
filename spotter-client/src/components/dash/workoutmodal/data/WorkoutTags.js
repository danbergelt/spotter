import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { tagStyles } from "./localutils/tagstyles";

const WorkoutTags = () => {

  const tags = useSelector(state => state.workoutReducer.tags)

  return (
    <div className="workout-data-tags">
      <h1 className="workout-data-tags-head">TAGS</h1>
      <div className="workout-data-tags-container">
        {!tags.length ? (
          <p
            className="workout-data-tags-head"
            style={{ fontSize: "1.2rem", margin: 0 }}
          >
            No tags
          </p>
        ) : (
          tags.map(tag => (
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

export default WorkoutTags;
