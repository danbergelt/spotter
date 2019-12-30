import { ValueType } from "react-select";
import { Option } from "src/components/dash/subnav/types/types";

export const MODAL_CTX: string = "MODAL_CTX";
export const SET_SCOPE: string = "SET_SCOPE";
export const SET_DATE: string = "SET_DATE";
export const SET_TIMESPAN: string = "SET_TIMESPAN";
export const CHANGE_SCOPE: string = "CHANGE_SCOPE";
export const CLOSE_WORKOUT_MODAL: string = "CLOSE_WORKOUT_MODAL";

// @desc --> sets dashboard scope to either weekly/monthly
type THandleScopeChange = (
  option: ValueType<Option>
) => { type: string; payload: ValueType<Option> };
export const handleScopeChangeAction: THandleScopeChange = option => {
  return {
    type: CHANGE_SCOPE,
    payload: option
  };
};

// @desc --> closes primary workout modal
type TCloseWorkoutModal = () => { type: string };
export const closeWorkoutModalAction: TCloseWorkoutModal = () => {
  return { type: CLOSE_WORKOUT_MODAL };
};
