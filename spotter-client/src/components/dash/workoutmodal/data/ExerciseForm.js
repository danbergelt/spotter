import React from "react";
import * as Yup from "yup";
import { Form, Field, withFormik, Formik } from "formik";
import { FiPlus, FiTrash } from "react-icons/fi";
import { connect, useSelector } from "react-redux";
import { handleEdit, resetQueue } from "../../../../actions/workoutActions";
import { isEmpty } from "lodash";

// Form validation schema
const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Enter exercise name")
    .max(40, "40 character max"),
  weight: Yup.number().max(2000, "2000 lb limit"),
  reps: Yup.number().max(2000, "2000 lb limit"),
  sets: Yup.number().max(2000, "2000 lb limit")
});

const ExerciseForm = ({ addExercise, refs, resetQueue, handleEdit}) => {

  const queued = useSelector(state => state.workoutReducer.queue);

  const resetHandler = handleReset => {
    handleReset();
    // resets edit queue - form relies on this information to determine type of action on submit (either edit or add)
    resetQueue();
  };

  return (
    <div className="exercise-form-container">
    <Formik
      initialValues={{
        name: (!isEmpty(queued) && queued.exercise.name) || "",
        weight: (!isEmpty(queued) && queued.exercise.weight) || "",
        sets: (!isEmpty(queued) && queued.exercise.sets) || "",
        reps: (!isEmpty(queued) && queued.exercise.reps) || ""
      }}
      validationSchema={ValidationSchema}
      enableReinitialize={true}
      onSubmit={(
        values,
        { resetForm }
      ) => {
        resetForm();

        refs.forEach(ref => ref.current.blur());

        if (isEmpty(queued)) {
          addExercise(values);
        } else {
          handleEdit(values, queued.i);
        }
      }}
    >
      {({
        handleReset,
        errors,
        touched
      }) => (
      <Form className="exercise-form">
        <div className="exercise-form-field-container">
          <div className="exercise-form-field-label">
            <label>Exercise</label>
          </div>
          {errors.name && touched.name && (
            <p className="error-exercise-form">{errors.name}</p>
          )}
          <Field
            innerRef={refs[0]}
            className="exercise-form-field"
            name="name"
            placeholder="e.g. squat"
            type="text"
          />
        </div>
        <div className="exercise-form-field-container">
          <label className="exercise-form-field-label">Weight</label>
          {errors.weight && touched.weight && (
            <p className="error-exercise-form">{errors.weight}</p>
          )}
          <Field
            innerRef={refs[1]}
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
            innerRef={refs[2]}
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
            innerRef={refs[3]}
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
  )
};

export default connect(null, { handleEdit, resetQueue })(ExerciseForm);
