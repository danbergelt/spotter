import React, { useState, useEffect } from "react";
import Select from "react-select";

const SubnavDropdown = () => {
  const options = [
    { value: "Week", label: "Week" },
    { value: "Month", label: "Month" }
  ];

  const [option, setOption] = useState(options[0]);

  const handleChange = selectedOption => {
    setOption(selectedOption);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        cursor: 'pointer'
      }
    }),
    indicatorSeparator: () => ({
      display: 0
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      position: "relative",
      right: "10px"
    }),
  }

  return (
    <>
      <Select
        className="subnav-menu-icon left dropdown"
        styles={customStyles}
        options={options}
        value={option}
        onChange={handleChange}
        defaultValue={option}
        isSearchable={false}
      />
    </>
  );
};

export default SubnavDropdown;
