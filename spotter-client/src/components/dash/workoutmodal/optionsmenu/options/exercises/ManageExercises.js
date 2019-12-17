import React, { useState } from "react";
import Exercise from "./Exercise";

const ManageExercises = ({ exercises }) => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState({});

  // search filter
  const filter = exercises.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

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
      {!exercises.length && (
        <div
          style={{ fontSize: "1.3rem", textAlign: "center", marginTop: "1rem" }}
        >
          No exercises found
        </div>
      )}
      {filter.length ? (
        exercises.map(exercise => (
          <div key={exercise._id} className="exercises">
            <Exercise
              exercise={exercise}
              active={active}
              setActive={setActive}
            />
          </div>
        ))
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
