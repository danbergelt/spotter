import React, { CSSProperties } from "react";
import Select, { Styles, ValueType } from "react-select";
import { SET_SCOPE, SET_TIMESPAN } from "../../../actions/timeScopeActions";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/types/State";

// controls workout range (determines range of workouts fetch call) - need to add active range to global state

const SubnavDropdown = () => {
  type Option = { value: string; label: string };
  type Options = Array<Option>;

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

  const handleChange: (option: ValueType<Option>) => void = (
    option: ValueType<Option>
  ) => {
    dispatch<{ type: string; payload: number }>({
      type: SET_TIMESPAN,
      payload: 0
    });
    dispatch({ type: SET_SCOPE, payload: option });
  };

  return (
    <>
      <Select
        className="subnav-menu-icon left dropdown"
        styles={customStyles}
        options={options}
        value={scope}
        onChange={(selectedOption: ValueType<Option>) =>
          handleChange(selectedOption)
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
