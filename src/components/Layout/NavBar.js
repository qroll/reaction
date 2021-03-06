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
        <StyledLink to="/list" id="list">
          Lazy Loaded List
        </StyledLink>
        <StyledLink to="/consent" id="consent">
          Consent form
        </StyledLink>
        <StyledLink to="/typo" id="typo">
          Typography
        </StyledLink>
        <StyledLink to="/grid" id="grid">
          Grids
        </StyledLink>
        <StyledLink to="/pagination" id="pagination">
          Pagination
        </StyledLink>
        <StyledLink to="/modal" id="modal">
          Modal
        </StyledLink>
        <StyledLink to="/request" id="request">
          Request
        </StyledLink>
      </StyledNavBar>
    );
  }
}

export default NavBar;
