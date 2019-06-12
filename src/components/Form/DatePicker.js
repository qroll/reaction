import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { WHITE, GRAY, ACCENT } from "src/styles";
import moment from "moment";

const StyledWrapper = styled.div`
  position: relative;
  display: ${props => (props.focused ? "block" : "none")};
`;

const DatePicker = styled.div`
  background-color: ${WHITE};
  border: 1px solid ${GRAY.LIGHT};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: scroll;
  position: absolute;
  top: calc(100% + 10px);
  left: 10px;
  width: auto;
  z-index: 1;
`;

const Week = styled.div`
  display: flex;
`;

const Day = styled.div`
  font-size: 0.8rem;
  height: 1.5rem;
  padding: 3px;
  width: 1.5rem;

  &:hover {
    background-color: ${GRAY.LIGHT};
  }
`;

const generateDates = () => {
  const startWeek = moment()
    .startOf("month")
    .week();
  const endWeek = moment()
    .endOf("month")
    .week();

  let calendar = [];
  for (let week = startWeek; week <= endWeek; week++) {
    calendar.push({
      week: week,
      days: Array(7)
        .fill(0)
        .map((n, i) =>
          moment()
            .week(week)
            .startOf("week")
            .clone()
            .add(n + i, "day")
        )
    });
  }

  return calendar;
};

class DateInput extends React.Component {
  onDateSelected = (e, date) => {
    if (this.props.onDateSelect) {
      this.props.onDateSelect(date);
    }
  };

  render() {
    let { isFocused } = this.props;

    return (
      <StyledWrapper focused={isFocused}>
        <DatePicker>
          {generateDates().map(({ week, days }) => (
            <Week>
              {days.map(day => (
                <Day onMouseDown={e => this.onDateSelected(e, day)}>
                  {day.format("D")}
                </Day>
              ))}
            </Week>
          ))}
        </DatePicker>
      </StyledWrapper>
    );
  }
}

DateInput.propTypes = {
  isFocused: PropTypes.bool,
  onDateSelect: PropTypes.func
};

export default DateInput;
