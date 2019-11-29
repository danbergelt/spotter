import React, { useRef } from "react";
import * as Yup from "yup";
import { Form, Field, withFormik } from "formik";
import { FiCheck, FiTrash, FiSave } from "react-icons/fi";

const ExerciseForm = ({
  submitForm,
  handleReset,
  values,
  addExercise,
  errors,
  touched,
  inputRef
}) => {
  return (
    <div className="exercise-form-container">
      <Form className="exercise-form">
        <div className="exercise-form-field-container">
          <div className="exercise-form-field-label">
            <label>Exercise</label>
          </div>
          {errors.exercise && touched.exercise && (
            <p className="error-exercise-form">{errors.exercise}</p>
          )}
          <Field
            innerRef={inputRef}
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
            onClick={handleReset}
          />
        </button>
      </Form>
    </div>
  );
};

const FormikExerciseForm = withFormik({
  mapPropsToValues({ name, weight, sets, reps }) {
    return {
      name: name || "",
      weight: weight || "",
      reps: sets || "",
      sets: reps || ""
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
  handleSubmit(values, { props: { addExercise, inputRef }, resetForm }) {
    resetForm();
    inputRef.current.focus();
    addExercise(values);
  }
})(ExerciseForm);

export default FormikExerciseForm;
