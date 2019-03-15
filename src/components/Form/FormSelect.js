import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { GRAY, ACCENT } from "src/styles";
import BorderlessInput from "./BorderlessInput";
import Dropdown from "./Dropdown";

const InputWrapper = styled.div`
  border: 1px solid ${GRAY.LIGHT};
  border-radius: 0.25rem;
  box-shadow: none;
  display: inline;
  font-size: 1rem;
  margin: 10px;
  outline: none;
  padding: 0.5rem;
  position: relative;

  &:hover {
    border: 1px solid ${GRAY.MEDIUM};
  }

  &:focus {
    border: 1px solid ${ACCENT.SECONDARY};
  }
`;

const DropdownItem = styled.div`
  cursor: default;
  padding: 10px;

  &:hover {
    background-color: ${GRAY.LIGHTEST};
  }
`;

class Select extends React.Component {
  state = {
    isFocused: false
  };

  handleOnSelect = (field, value) => e => {
    if (this.props.onChange) {
      this.props.onChange(field, value);
    }
    this.setState({ isFocused: false });
  };

  handleOnFocus = () => {
    this.setState({ isFocused: true });
  };

  handleOnBlur = () => {
    if (this.ref && document.activeElement.id === this.ref.id) {
      // do nothing
      this.setState({ isFocused: false });
    } else {
      console.log(">>>blur");
      this.setState({ isFocused: false });
    }
  };

  render() {
    let { field, value, placeholder, options, renderDropdownItem } = this.props;
    let { isFocused } = this.state;

    let isObject =
      options[0] &&
      typeof options[0] === "object" &&
      !Array.isArray(options[0]);

    return (
      <InputWrapper
        id={`select-${Array.isArray(field) ? field.join("-") : field}`}
        tabIndex="0"
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        ref={ref => (this.ref = ref)}
      >
        <BorderlessInput
          type="text"
          field={field}
          value={
            isObject
              ? (options.find(option => option.value === value) || {}).label ||
                ""
              : value
          }
          placeholder={placeholder}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          readOnly
          disabled
        />
        {isFocused && (
          <Dropdown>
            {options.map(option =>
              renderDropdownItem ? (
                renderDropdownItem(option)
              ) : isObject ? (
                <DropdownItem
                  onMouseDown={this.handleOnSelect(field, option.value)}
                  key={option.value}
                  className="dropdown-item"
                >
                  {option.label}
                </DropdownItem>
              ) : (
                <DropdownItem
                  onMouseDown={this.handleOnSelect(field, option)}
                  key={option}
                  className="dropdown-item"
                >
                  {option}
                </DropdownItem>
              )
            )}
          </Dropdown>
        )}
      </InputWrapper>
    );
  }
}

Select.propTypes = {
  field: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  value: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  renderDropdownItem: PropTypes.func
};

export default Select;
