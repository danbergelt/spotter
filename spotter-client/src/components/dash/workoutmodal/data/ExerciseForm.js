import React from "react";
import * as Yup from "yup";
import { Form, Field, withFormik } from "formik";
import { FiCheck, FiTrash } from "react-icons/fi";
import { connect } from "react-redux";
import { handleEdit, resetQueue } from "../../../../actions/workoutActions";
import { isEmpty } from "lodash";

const ExerciseForm = ({
  handleReset,
  values,
  addExercise,
  errors,
  touched,
  a,
  b,
  c,
  d,
  queued,
  handleEdit,
  resetQueue
}) => {
  const resetHandler = () => {
    handleReset();
    resetQueue();
  };

  return (
    <div className="exercise-form-container">
      <Form className="exercise-form">
        <div className="exercise-form-field-container">
          <div className="exercise-form-field-label">
            <label>Exercise</label>
          </div>
          {errors.name && touched.name && (
            <p className="error-exercise-form">{errors.name}</p>
          )}
          <Field
            innerRef={a}
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
            innerRef={b}
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
            innerRef={c}
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
            innerRef={d}
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
          <FiCheck className="exercise-form-button submit" />
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
            onClick={resetHandler}
          />
        </button>
      </Form>
    </div>
  );
};

const FormikExerciseForm = withFormik({
  mapPropsToValues({ queued, name, weight, sets, reps }) {
    return {
      name: (!isEmpty(queued) && queued.exercise.name) || name || "",
      weight: (!isEmpty(queued) && queued.exercise.weight) || weight || "",
      sets: (!isEmpty(queued) && queued.exercise.sets) || sets || "",
      reps: (!isEmpty(queued) && queued.exercise.reps) || reps || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Enter exercise name")
      .max(40, "40 character max"),
    weight: Yup.number().max(2000, "2000 lb limit"),
    reps: Yup.number().max(2000, "2000 lb limit"),
    sets: Yup.number().max(2000, "2000 lb limit")
  }),
  enableReinitialize: true,
  handleSubmit(
    values,
    { props: { addExercise, a, b, c, d, queued, handleEdit }, resetForm }
  ) {
    resetForm();

    [a, b, c, d].forEach(ref => ref.current.blur());

    if (isEmpty(queued)) {
      addExercise(values);
    } else {
      handleEdit(values, queued.i);
    }
  }
})(ExerciseForm);

const mapStateToProps = state => {
  return {
    queued: state.workoutReducer.queue
  };
};

export default connect(mapStateToProps, { handleEdit, resetQueue })(
  FormikExerciseForm
);
