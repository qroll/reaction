import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class Layout extends React.Component {
  render() {
    return (
      <Wrapper className="app">
        <NavBar />
        {this.props.children}
      </Wrapper>
    );
  }
}

export default Layout;
