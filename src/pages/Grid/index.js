import React, { Component } from "react";
import styled, { css } from "styled-components";

const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const NavGrid = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 2fr;

  @media (max-width: 600px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;

    #navbar__links {
      order: 3;
      grid-column: 1 / span 2;
    }
  }
`;

const mixin = css`
  color: ${props => props.color};
`;

const CSS = styled.div`
  background-color: #bbee88;
  ${props => props.mix}
`;

const generateThis = () => {
  const result = new Array(2).fill(0).map((_, index) => {
    return css`
      & > div {
        background-color: #bbb;
      }

      ${mixin}
    `;
  });

  console.log(result);

  return result;
};

class Typography extends Component {
  render() {
    return (
      <Page>
        <NavGrid>
          <div id="navbar__logo">logo</div>
          <div id="navbar__links">links</div>
          <div id="navbar__right">user profile</div>
        </NavGrid>
        <CSS mix={generateThis()} color="#fff">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </CSS>
      </Page>
    );
  }
}

export default Typography;
