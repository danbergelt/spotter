import React, { CSSProperties } from "react";
import Select, { Styles, ValueType } from "react-select";
import { SET_SCOPE } from "../../../actions/timeScopeActions";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/types/State";

// controls workout range (determines range of workouts fetch call) - need to add active range to global state

const SubnavDropdown = () => {
  type Options = { value: string; label: string }[];
  type Option = { value: string; label: string };

  const options: Options = [
    { value: "Week", label: "Week" },
    { value: "Month", label: "Month" }
  ];

  const fetchScope = (state: State) => state.globalReducer.scope;

  const scope: Option = useSelector(fetchScope);

  const dispatch = useDispatch();

  const customStyles: Partial<Styles> = {
    control: (provided: CSSProperties) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      cursor: "pointer"
    }),
    indicatorSeparator: () => ({
      display: "none"
    }),
    dropdownIndicator: (provided: CSSProperties) => ({
      ...provided,
      position: "relative",
      right: "10px"
    }),
    option: (provided: CSSProperties) => ({
      ...provided,
      cursor: "pointer"
    })
  };

  return (
    <>
      <Select
        className="subnav-menu-icon left dropdown"
        styles={customStyles}
        options={options}
        value={scope}
        onChange={(selectedOption: ValueType<Option>) =>
          dispatch({ type: SET_SCOPE, payload: selectedOption as Option })
        }
        defaultValue={scope}
        isSearchable={false}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary50: "white",
            primary25: "white"
          }
        })}
      />
    </>
  );
};

export default SubnavDropdown;
