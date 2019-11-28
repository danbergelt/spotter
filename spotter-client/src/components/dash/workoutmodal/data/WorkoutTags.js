import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const WorkoutTags = ({ tags }) => {

  const [tagsInState, setTagsInState] = useState([]);

  useEffect(() => {
    setTagsInState(tags)
  }, [tags]) 


  return (
    <div className="workout-data-tags">
      <h1 className="workout-data-tags-head">TAGS</h1>
      <div className="workout-data-tags-container">
        {!tags.length ? (
          <p className="workout-data-tags-head" style={{ fontSize: "1.2rem" }}>
            No tags
          </p>
        ) : (
          tagsInState.map(tag => <div key={tag._id}>{tag._id}</div>)
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
