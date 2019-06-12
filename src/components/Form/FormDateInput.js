import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

import { WHITE, GRAY, ACCENT } from "src/styles";
import DatePicker from "./DatePicker";

const StyledWrapper = styled.div`
  position: relative;
`;

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

class DateInput extends React.Component {
  state = {
    isFocused: false
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  handleInputChange = e => {
    // blah
  };

  handleDateChange = date => {
    if (this.props.onChange) {
      this.props.onChange(this.props.field, date);
    }
  };

  render() {
    let { field, value, placeholder, readOnly } = this.props;
    let { isFocused } = this.state;

    let valueString = moment.isMoment(value) ? value.format("D MMM YYYY") : "";

    return (
      <StyledWrapper>
        <StyledInput
          type="text"
          id={`textfield-${Array.isArray(field) ? field.join("-") : field}`}
          value={valueString}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          readOnly={readOnly}
        />
        <DatePicker
          isFocused={isFocused}
          onDateSelect={this.handleDateChange}
        />
      </StyledWrapper>
    );
  }
}

DateInput.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.instanceOf(moment),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool
};

export default DateInput;
