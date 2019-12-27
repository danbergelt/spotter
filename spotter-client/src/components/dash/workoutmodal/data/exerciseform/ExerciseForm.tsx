import React, { useState } from "react";
import { Form, Field, Formik } from "formik";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { ValidationSchema } from "./ValidationSchema"
import {
  RESET_QUEUE,
  ADD_EXERCISE,
  HANDLE_EDIT
} from "../../../../../actions/workoutActions";
import Autosuggest from "react-autosuggest";
import { State } from "src/types/State";
import { Queued, Refs } from '../../../../../types/Exercises';
import {Exercise as E } from '../../../../../types/ExerciseOption';

// READ: this component is a nightmare. Formik claims to make working with forms easer,
// but it does not play nicely with other libraries. I need to figure out how to optimize this,
// or consider other options going forward

interface Props {
  refs: Refs;
}

const ExerciseForm: React.FC<Props> = ({ refs }) => {

  // queued represents the object currently being edited
  const fetchQueued = (state: State) => state.workoutReducer.queue;
  const queued: Queued = useSelector(fetchQueued) as Queued;

  const fetchExercises = (state: State) =>
    state.fetchExercisesReducer.savedExercises;
  const exercises: Array<E> = useSelector(fetchExercises);

  const dispatch = useDispatch();

  const resetHandler = (handleReset: () => void): void => {
    handleReset();
    // resets edit queue - form relies on this information to determine type of action on submit (either edit or add)
    dispatch<{ type: string }>({ type: RESET_QUEUE });
  };

  const [suggestions, setSuggestions] = useState<Array<E>>([]);

  return (
    <div className="exercise-form-container">
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          // if an exercise is queued, populate with that exercise. otherwise, initialize to empty fields
          name: (!isEmpty(queued) && queued.exercise.name) || "",
          weight: (!isEmpty(queued) && queued.exercise.weight) || "",
          sets: (!isEmpty(queued) && queued.exercise.sets) || "",
          reps: (!isEmpty(queued) && queued.exercise.reps) || ""
        }}
        validationSchema={ValidationSchema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          resetForm();

          // aside from new exercise name, blur all fields on submit
          refs.forEach((ref: React.RefObject<HTMLInputElement>) => {
            if (ref.current) {
              ref.current.blur();
            }
          });

          // if we editing an exercise, submit an edit dispatch. otherwise submit an add dispatch
          if (isEmpty(queued)) {
            dispatch<{type: string, payload: object}>({ type: ADD_EXERCISE, payload: values });
          } else {
            dispatch<{type: string, payload: {exercise: object, i: number}}>({
              type: HANDLE_EDIT,
              payload: { exercise: values, i: queued.i }
            });
          }
        }}
      >
        {({ handleReset, errors, touched, setFieldValue, values }) => (
          <Form className="exercise-form">
            <div className="exercise-form-field-container">
              <div className="exercise-form-field-label">
                <label>Exercise</label>
              </div>
              {errors.name && touched.name && (
                <p className="error-exercise-form">{errors.name}</p>
              )}

              <Autosuggest
                inputProps={{
                  placeholder: "e.g. squat",
                  autoComplete: "off",
                  name: "name",
                  onChange: (_, { newValue }) => {
                    setFieldValue("name", newValue);
                  },
                  value: values.name,
                  className: "exercise-form-field"
                }}
                suggestions={suggestions}
                onSuggestionsFetchRequested={({ value }) => {
                  if (!value) {
                    setSuggestions([]);
                    return;
                  }

                  setSuggestions(
                    exercises.filter((exercise: E) =>
                      exercise.name.toLowerCase().includes(value.toLowerCase())
                    )
                  );
                }}
                onSuggestionsClearRequested={() => {
                  setSuggestions([]);
                }}
                getSuggestionValue={suggestion => suggestion.name}
                renderSuggestion={suggestion => <div>{suggestion.name}</div>}
                onSuggestionSelected={(event, { suggestion, method }) => {
                  if (method === "enter") {
                    event.preventDefault();
                  }
                  setFieldValue("name", suggestion.name);
                }}
              />
            </div>
            <div className="exercise-form-field-container">
              <label className="exercise-form-field-label">Weight</label>
              {errors.weight && touched.weight && (
                <p className="error-exercise-form">{errors.weight}</p>
              )}
              <Field
                innerRef={refs[0]}
                className="exercise-form-field"
                name="weight"
                placeholder="lbs"
                type="number"
              />
            </div>
            <div className="exercise-form-field-container">
              <label className="exercise-form-field-label">Sets</label>
              {errors.sets && touched.sets && (
                <p className="error-exercise-form">{errors.sets}</p>
              )}
              <Field
                innerRef={refs[1]}
                className="exercise-form-field"
                name="sets"
                placeholder="# of sets"
                type="number"
              />
            </div>
            <div className="exercise-form-field-container">
              <label className="exercise-form-field-label">Reps</label>
              {errors.reps && touched.reps && (
                <p className="error-exercise-form">{errors.reps}</p>
              )}
              <Field
                innerRef={refs[2]}
                className="exercise-form-field"
                name="reps"
                placeholder="# of reps"
                type="number"
              />
            </div>
            <button
              data-testid="submit-exercise"
              style={{
                border: "none",
                background: "none",
                padding: "0",
                outline: "none"
              }}
              type="submit"
            >
              <FiPlus className="exercise-form-button submit" />
            </button>
            <button
              style={{
                border: "none",
                background: "none",
                padding: "0",
                outline: "none"
              }}
              type="button"
            >
              <FiTrash
                data-testid="trash-exercise"
                className="exercise-form-button clear"
                type="button"
                onClick={() => resetHandler(handleReset)}
              />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ExerciseForm;
