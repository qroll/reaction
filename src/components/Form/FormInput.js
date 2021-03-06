import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { GRAY, ACCENT } from "src/styles";

const StyledInput = styled.input`
  border: 1px solid ${GRAY.LIGHT};
  border-radius: 0.25rem;
  box-shadow: none;
  font-size: 1rem;
  margin: 10px;
  outline: none;
  padding: 0.5rem;

  &:hover {
    border: 1px solid ${GRAY.MEDIUM};
  }

  &:focus {
    border: 1px solid ${ACCENT.SECONDARY};
  }
`;

const Error = styled.div`
  color: red;
  font-size: 0.8rem;
`;

class TextInput extends React.Component {
  state = {
    isTouched: false
  };

  handleInputChange = e => {
    let value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(this.props.field, value);
    }
  };

  handleFocus = () => {
    if (!this.state.isTouched) {
      this.setState({ isTouched: true });
    }
    if (this.props.onFocusChange) {
      this.props.onFocusChange(true);
    }
  };

  handleBlur = () => {
    if (this.props.onFocusChange) {
      this.props.onFocusChange(false);
    }
  };

  render() {
    let { field, value, placeholder, readOnly, errorMessage } = this.props;

    return (
      <>
        <StyledInput
          type="text"
          id={`textfield-${Array.isArray(field) ? field.join("-") : field}`}
          value={value}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          readOnly={readOnly}
        />
        {errorMessage && <Error>{errorMessage}</Error>}
      </>
    );
  }
}

TextInput.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  readOnly: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default TextInput;
