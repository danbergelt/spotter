import axiosWithAuth from "../../../../../../utils/axiosWithAuth";
import reFetch from "../../../../../../utils/reFetch";

export const saveWorkout = async (
  date,
  workout,
  closeParentModal,
  errDispatch,
  week,
  history
) => {
  try {
    await axiosWithAuth().post(
      `${process.env.REACT_APP_T_API}/api/auth/workouts`,
      {
        date: date.format("MMM DD YYYY"),
        title: workout.title,
        notes: workout.notes,
        exercises: workout.exercises,
        tags: workout.tags
      }
    );
    // refetch updated list of workouts
    await reFetch(week, history);
    // close modal and return to dashboard
    closeParentModal();
  } catch (err) {
    errDispatch(err);
  }
};

export const editWorkout = async (
  workoutId,
  workout,
  week,
  history,
  closeParentModal,
  errDispatch
) => {
  try {
    await axiosWithAuth().put(
      `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`,
      {
        title: workout.title,
        notes: workout.notes,
        exercises: workout.exercises,
        tags: workout.tags
      }
    );
    // refetch updated list of workouts
    await reFetch(week, history);
    // close modal and return to dashboard
    closeParentModal();
  } catch (err) {
    errDispatch(err);
  }
};
