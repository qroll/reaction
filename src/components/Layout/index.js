import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Content = styled.div`
  flex: 3;
`;

class Layout extends React.Component {
  render() {
    return (
      <Wrapper className="app">
        <NavBar />
        <Content>{this.props.children}</Content>
      </Wrapper>
    );
  }
}

export default Layout;
