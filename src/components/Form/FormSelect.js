import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import throttle from "lodash.throttle";

import { GRAY, ACCENT, WHITE } from "src/styles";
import BorderlessInput from "./BorderlessInput";

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

const Dropdown = styled.div`
  background-color: ${WHITE};
  border: 1px solid ${GRAY.LIGHT};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  overflow: scroll;
  position: absolute;
  top: auto;
  left: 0;
  width: 100%;
`;

const Scrim = styled.div`
  ${props => (props.scrolledTo ? "visibility: hidden;" : null)}

  background: linear-gradient(
    to ${props => (props.top ? "bottom" : "top")},
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  height: 5px;
  min-height: 5px;
  position: sticky;
  ${props => (props.top ? "top" : "bottom")}: 0;
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
    isFocused: false,
    scrollToBottom: true,
    scrollToTop: true
  };

  componentDidMount = () => {
    if (this.ref) {
      let { scrollHeight, clientHeight } = this.ref;
      if (scrollHeight > clientHeight) {
        this.setState({ scrollToBottom: false });
      }
    }
  };

  handleOnScroll = e => {
    let { scrollHeight, scrollTop, clientHeight } = e.target;
    this.controlScrim({ scrollHeight, scrollTop, clientHeight });
  };

  controlScrim = throttle(el => {
    let { scrollHeight, scrollTop, clientHeight } = el;

    const atTop = scrollTop === 0;
    this.setState({ scrollToTop: atTop });

    const atBottom = scrollHeight - scrollTop === clientHeight;
    this.setState({ scrollToBottom: atBottom });
  }, 100);

  handleInputChange = (field, value) => {
    if (this.props.onChange) {
      this.props.onChange(field, value);
    }
  };

  render() {
    let { field, value, placeholder, options, renderDropdownItem } = this.props;
    let { isFocused, scrollToBottom, scrollToTop } = this.state;

    return (
      <InputWrapper>
        <BorderlessInput
          type="text"
          id={`textfield-${field}`}
          value={value}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
        />
        {isFocused && (
          <Dropdown
            onScroll={this.handleOnScroll}
            ref={ref => (this.ref = ref)}
          >
            <Scrim top scrolledTo={scrollToTop} />
            {options.map(option =>
              renderDropdownItem ? (
                renderDropdownItem(option)
              ) : (
                <DropdownItem key={option.value}>{option.label}</DropdownItem>
              )
            )}
            <Scrim bottom scrolledTo={scrollToBottom} />
          </Dropdown>
        )}
      </InputWrapper>
    );
  }
}

Select.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  renderDropdownItem: PropTypes.func
};

export default Select;
