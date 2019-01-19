import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledInput = styled.input`
  border: none;
  box-shadow: none;
  font-size: 1rem;
  outline: none;
`;

class TextInput extends React.Component {
  handleInputChange = e => {
    if (this.props.onChange) {
      this.props.onChange(this.props.field, e.target.value);
    }
  };

  render() {
    let { field, value, placeholder, readOnly, onFocus, onBlur } = this.props;
    return (
      <StyledInput
        type="text"
        id={`textfield-${field}`}
        value={value}
        placeholder={placeholder}
        onChange={this.handleInputChange}
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }
}

TextInput.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default TextInput;
