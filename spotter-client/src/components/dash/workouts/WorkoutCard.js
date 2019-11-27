import React from "react";
import { FiAlignLeft } from "react-icons/fi";

const WorkoutCard = ({ data }) => {
  return (
    <>
      <div data-testid="workout-title" className="workout-card-title">
        {data.title}
      </div>
      {data.notes || data.exercises.length ? (
        <FiAlignLeft className="workout-card-notes-ind" />
      ) : null}
      <div className="workout-card-tag-container">
        {data.tags.map(el => (
          <div
            className="workout-card-tag"
            key={el._id}
            style={{ background: el.color }}
          >
            {el.content.toUpperCase()}
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkoutCard;
