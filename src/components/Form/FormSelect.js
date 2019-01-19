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

  handleInputChange = (field, value) => {
    if (this.props.onChange) {
      this.props.onChange(field, value);
    }
  };

  handleOnSelect = (field, value) => e => {
    if (this.props.onChange) {
      this.props.onChange(field, value);
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
      <InputWrapper>
        <BorderlessInput
          type="text"
          id={`textfield-${field}`}
          value={
            isObject
              ? (options.find(option => option.value === value) || {}).label ||
                ""
              : value
          }
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
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
                >
                  {option.label}
                </DropdownItem>
              ) : (
                <DropdownItem
                  onMouseDown={this.handleOnSelect(field, option)}
                  key={option}
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
