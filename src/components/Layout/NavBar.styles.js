import styled from "styled-components";
import { Link } from "react-router-dom";

import { GRAY, WHITE, ACCENT } from "src/styles";

export const StyledNavBar = styled.nav`
  background-color: ${WHITE};
  border: 1px solid ${GRAY.LIGHTER};
  border-left: 3px solid ${GRAY.LIGHTER};
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333333;
  font-family: "Roboto Condensed";
  padding: 10px 10px 7px 10px;

  &:hover {
    border-left: 3px solid ${ACCENT.PRIMARY_MUTED};
    margin-left: -3px;
  }

  &:active {
    color: ${ACCENT.PRIMARY_MUTED};
  }
`;
