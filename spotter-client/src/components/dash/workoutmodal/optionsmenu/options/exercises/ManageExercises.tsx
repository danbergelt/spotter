import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import Exercise from "./Exercise";
import { DELETE_SAVED_EXERCISE } from "../../../../../../actions/fetchExercisesActions";
import { Exercise as E } from "../../../../../../types/ExerciseOption";
import { State } from "src/types/State";

// search and delete exercises

interface Props {
  exercises: Array<E>;
}

const ManageExercises: React.FC<Props> = ({ exercises }) => {
  const [search, setSearch] = useState<string>("");

  const fetchToken = (state: State) => state.globalReducer.t;
  const t: string | null = useSelector(fetchToken);
  const dispatch = useDispatch();

  // search filter
  const filter: Array<E> = exercises.filter((e: E) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteExercise = async (id: string) => {
    await axiosWithAuth(t).delete(
      `${process.env.REACT_APP_T_API}/api/auth/exercises/${id}`
    );
    dispatch<{ type: string; payload: string }>({
      type: DELETE_SAVED_EXERCISE,
      payload: id
    });
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
            {filter.map((exercise: E) => (
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
