import React from "react";

import { StyledNavBar, StyledLink } from "./NavBar.styles";

class NavBar extends React.Component {
  render() {
    return (
      <StyledNavBar>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/order">Props</StyledLink>
        <StyledLink to="/booking">Context (Single)</StyledLink>
      </StyledNavBar>
    );
  }
}

export default NavBar;
