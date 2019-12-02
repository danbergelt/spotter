import axiosWithAuth from "../../../../utils/axiosWithAuth";

// helper function to handle submitting template
export const handleSubmit = async (e, params) => {
  e.preventDefault();
  try {
    await axiosWithAuth().post(
      `${process.env.REACT_APP_T_API}/api/auth/templates`,
      {
        name: params.tempName,
        title: params.workout.title,
        tags: params.workout.tags,
        notes: params.workout.notes,
        exercises: params.workout.exercises
      }
    );
    params.setTempName("");
    params.setMessage({ success: "Template created" });
  } catch (error) {
    if (error.response) {
      params.setMessage({ error: error.response.data.error });
    }
  }
};
