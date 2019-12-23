import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import Exercise from "./Exercise";
import { DELETE_SAVED_EXERCISE } from "../../../../../../actions/fetchExercisesActions";

// search and delete exercises

const ManageExercises = ({ exercises }) => {
  const [search, setSearch] = useState("");
  const t = useSelector(state => state.globalReducer.t);
  const dispatch = useDispatch();

  // search filter
  const filter = exercises.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteExercise = async id => {
    await axiosWithAuth(t).delete(
      `${process.env.REACT_APP_T_API}/api/auth/exercises/${id}`
    );
    dispatch({ type: DELETE_SAVED_EXERCISE, payload: id });
  };

  return (
    <>
      <div>
        <input
          autoFocus
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search exercises..."
          className="exercises-add"
        />
      </div>
      {exercises.length ? (
        filter.length ? (
          <div className="exercises">
            {filter.map(exercise => (
              <Exercise
                key={exercise._id}
                deleteExercise={deleteExercise}
                exercise={exercise}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              fontSize: "1.3rem",
              textAlign: "center",
              marginTop: "1rem"
            }}
          >
            No exercises found
          </div>
        )
      ) : (
        <div
          style={{ fontSize: "1.3rem", textAlign: "center", marginTop: "1rem" }}
        >
          No exercises found
        </div>
      )}
    </>
  );
};

export default ManageExercises;
