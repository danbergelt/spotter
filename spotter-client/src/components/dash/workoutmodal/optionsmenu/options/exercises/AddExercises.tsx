import React, { useState } from "react";
import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_EXERCISE } from "../../../../../../actions/fetchExercisesActions";
import SaveExerciseMsg from "./SaveExerciseMsg";
import { fetchToken } from "src/types/State";
import { AxiosResponse } from "axios";
import { Exercise, Msg } from '../../../../../../types/ExerciseOption';

// create exercise

interface Props {
  msg: Msg;
  setMsg: React.Dispatch<React.SetStateAction<Msg>>;
}

const AddExercises: React.FC<Props> = ({ msg, setMsg }) => {
  const [add, setAdd] = useState<string>("");

  const t: string | null = useSelector(fetchToken);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdd("");
    try {
      const res: AxiosResponse<any> = await axiosWithAuth(t).post(
        `${process.env.REACT_APP_T_API}/api/auth/exercises`,
        {
          name: add
        }
      );
      dispatch<{ type: string; payload: Exercise }>({
        type: CREATE_EXERCISE,
        payload: res.data.exercise
      });

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
