import React, { CSSProperties } from "react";
import Select, { Styles, ValueType } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/types/State";
import { handleScopeChangeAction } from "src/actions/globalActions";
import { Options, Option } from "./types/types";

// controls workout range (determines range of workouts fetch call) - need to add active range to global state

const SubnavDropdown = () => {

  const options: Options = [
    { value: "Week", label: "Week" },
    { value: "Month", label: "Month" }
  ];

  const scope: Option = useSelector((state: State) => state.globalReducer.scope);
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

  const handleChange = (option: ValueType<Option>) => {
    dispatch(handleScopeChangeAction(option));
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
