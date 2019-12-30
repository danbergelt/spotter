import { ValueType } from "react-select";
import { Option } from "src/components/dash/subnav/types/types";

export const MODAL_CTX: string = "MODAL_CTX";
export const SET_SCOPE: string = "SET_SCOPE";
export const SET_DATE: string = "SET_DATE";
export const SET_TIMESPAN: string = "SET_TIMESPAN";
export const CHANGE_SCOPE: string = "CHANGE_SCOPE";

type THandleScopeChange = (
  option: ValueType<Option>
) => { type: string; payload: ValueType<Option> };


// sets dashboard scope to either weekly/monthly
export const handleScopeChangeAction: THandleScopeChange = option => {
  return {
    type: CHANGE_SCOPE,
    payload: option
  };
};
