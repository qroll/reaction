import React, { Component } from "react";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Capitalize = styled.h1`
  text-transform: capitalize;
`;

const Lowercase = styled.h1`
  text-transform: lowercase;
`;

class Typography extends Component {
  render() {
    return (
      <Page>
        <Capitalize id="capitalize">This is upper case</Capitalize>
        <Lowercase id="lower">This is lower case</Lowercase>
      </Page>
    );
  }
}

export default Typography;
