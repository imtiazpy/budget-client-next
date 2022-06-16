import React, {useState} from "react";
import { withTheme } from "styled-components";

import Select from "react-select";

const defaultOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const getCustomStyles = (theme, accentColor, bg, border, indicator) => {
  return {
    dropdownIndicator: () => {
      return {
        display: !indicator && "none",
      };
    },
    indicatorSeparator: () => {},
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? theme?.colors[accentColor] : theme?.colors.dark,
        textAlign: "left",
        backgroundColor: bg,
      };
    },
    control: (provided, state) => {
      return {
        ...provided,
        border: !border
          ? "none"
          : state.menuIsOpen || state.isFocused
          ? `1px solid ${theme?.colors[accentColor]} !important`
          : `1px solid ${theme?.colors.border} !important`,
        borderRadius: 30,
        padding: ".75rem 0.5rem",
        width: "100%",
        color: "#727c92",
        maxHeight: "80px",
        outline: "none",
        boxShadow: "none",
        textAlign: "left",
        backgroundColor: bg,
        fontSize: "14px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        flexWrap: 'nowrap',
      };
    },
  };
};

const SelectStyled = ({
  theme,
  bg = "#fff",
  border = false,
  accentColor = "success",
  name,
  indicator = true,
  options = defaultOptions,
  defaultValue,
  onChange,
  limit,
  ...rest
}) => {

  return (
    <>
        <Select
            styles={getCustomStyles(theme, accentColor, bg, border, indicator)}
            defaultValue={defaultValue}
            name={name}
            options={options}
            instanceId="inId"
            onChange={onChange}
            required
            {...rest}
        />
    </>
  );
};

// export default withTheme(SelectStyled);
export default SelectStyled;
