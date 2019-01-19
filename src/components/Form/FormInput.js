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

class TextInput extends React.Component {
  handleInputChange = e => {
    if (this.props.onChange) {
      this.props.onChange(this.props.field, e.target.value);
    }
  };

  render() {
    let { field, value, placeholder, readOnly } = this.props;
    return (
      <StyledInput
        type="text"
        id={`textfield-${field}`}
        value={value}
        placeholder={placeholder}
        onChange={this.handleInputChange}
        readOnly={readOnly}
      />
    );
  }
}

TextInput.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool
};

export default TextInput;
