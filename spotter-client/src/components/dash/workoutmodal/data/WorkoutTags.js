import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

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
          <p className="workout-data-tags-head" style={{ fontSize: "1.2rem", margin: 0 }}>
            No tags
          </p>
        ) : (
          tagsInState.map(tag => (
            <div
              data-testid="mapped-tag"
              style={{
                background: tag.color,
                minWidth: "40px",
                minHeight: "30px",
                borderRadius: "4px",
                padding: "0.75rem",
                margin: "0.25rem 0.25rem 0.25rem 0",
                color: "white",
                fontSize: "1.3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              key={tag._id}
            >
              {tag.content}
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
