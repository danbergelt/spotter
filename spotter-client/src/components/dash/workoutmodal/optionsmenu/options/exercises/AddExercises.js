import React, { useState } from "react";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_EXERCISE } from "../../../../../../actions/fetchExercisesActions";
import SaveExerciseMsg from "./SaveExerciseMsg";

// create exercise

const AddExercises = ({ msg, setMsg }) => {
  const [add, setAdd] = useState("");
  const t = useSelector(state => state.globalReducer.t);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    setAdd("");
    try {
      const res = await axiosWithAuth(t).post(
        `${process.env.REACT_APP_T_API}/api/auth/exercises`,
        { name: add }
      );
      dispatch({ type: CREATE_EXERCISE, payload: res.data.exercise });

      setMsg({ success: "Exercise created" });
    } catch (error) {
      setMsg({ error: error.response.data.error });
    }
  };

  return (
    <>
      <form
        onSubmit={e => handleSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <input
          autoFocus
          value={add}
          onChange={e => setAdd(e.target.value)}
          placeholder="Create exercise..."
          className="exercises-add"
        />
        <button data-testid="create-exercise" className="btn-exercise">Create</button>
      </form>
      {msg.error && (
        <SaveExerciseMsg
          errOrSucc={"exercise-save error"}
          msg={msg.error}
          setMsg={setMsg}
        />
      )}
      {msg.success && (
        <SaveExerciseMsg
          errOrSucc={"exercise-save success"}
          msg={msg.success}
          setMsg={setMsg}
        />
      )}
    </>
  );
};

export default AddExercises;
