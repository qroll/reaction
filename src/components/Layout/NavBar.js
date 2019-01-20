import React from "react";

import { StyledNavBar, StyledLink } from "./NavBar.styles";

class NavBar extends React.Component {
  render() {
    return (
      <StyledNavBar id="navbar">
        <StyledLink to="/" id="home">
          Home
        </StyledLink>
        <StyledLink to="/order" id="order">
          Props
        </StyledLink>
        <StyledLink to="/booking" id="booking">
          Context (Single)
        </StyledLink>
      </StyledNavBar>
    );
  }
}

export default NavBar;
