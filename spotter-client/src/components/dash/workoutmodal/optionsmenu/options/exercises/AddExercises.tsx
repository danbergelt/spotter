import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExerciseAction } from "../../../../../../actions/fetchExercisesActions";
import SaveExerciseMsg from "./SaveExerciseMsg";
import { fetchToken } from "src/types/State";
import { Msg } from '../../../../../../types/ExerciseOption';

// create exercise

interface Props {
  msg: Msg;
  setMsg: React.Dispatch<React.SetStateAction<Msg>>;
}

const AddExercises: React.FC<Props> = ({ msg, setMsg }) => {
  const [exercise, setExercise] = useState<string>("");

  const t: string | null = useSelector(fetchToken);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExercise("");
    await dispatch(createExerciseAction(t, exercise, setMsg))
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
          value={exercise}
          onChange={e => setExercise(e.target.value)}
          placeholder="Create exercise..."
          className="exercises-add"
        />
        <button data-testid="create-exercise" className="btn-exercise">
          Create
        </button>
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
