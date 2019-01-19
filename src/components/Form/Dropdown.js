import React from "react";
import styled from "styled-components";
import throttle from "lodash.throttle";

import { GRAY, WHITE } from "src/styles";

const DropdownList = styled.div`
  background-color: ${WHITE};
  border: 1px solid ${GRAY.LIGHT};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  overflow: scroll;
  position: absolute;
  top: calc(100% + 10px);
  left: -1px;
  width: calc(100% + 2px);
  z-index: 1;
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

class Dropdown extends React.Component {
  state = {
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

  render() {
    let { scrollToBottom, scrollToTop } = this.state;

    return (
      <DropdownList
        onScroll={this.handleOnScroll}
        ref={ref => (this.ref = ref)}
      >
        <Scrim top scrolledTo={scrollToTop} />
        {this.props.children}
        <Scrim bottom scrolledTo={scrollToBottom} />
      </DropdownList>
    );
  }
}

export default Dropdown;
