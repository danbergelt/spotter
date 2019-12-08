import React from "react";
import Select from "react-select";
import { SET_SCOPE } from "../../../actions/timeScopeActions";
import { useDispatch, useSelector } from "react-redux";

// controls workout range (determines range of workouts fetch call) - need to add active range to global state

const SubnavDropdown = () => {
  const options = [
    { value: "Week", label: "Week" },
    { value: "Month", label: "Month" }
  ];

  const scope = useSelector(state => state.globalReducer.scope);

  const dispatch = useDispatch();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        cursor: "pointer"
      }
    }),
    indicatorSeparator: () => ({
      display: 0
    }),
    dropdownIndicator: provided => ({
      ...provided,
      position: "relative",
      right: "10px"
    }),
    option: provided => ({
      ...provided,
      "&:hover": {
        cursor: "pointer"
      }
    })
  };

  return (
    <>
      <Select
        className="subnav-menu-icon left dropdown"
        styles={customStyles}
        options={options}
        value={scope}
        onChange={selectedOption =>
          dispatch({ type: SET_SCOPE, payload: selectedOption })
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
