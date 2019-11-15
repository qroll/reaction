import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const PaginationBarContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 1rem;
`;

export const PaginationIndicatorContainer = styled.div`
  display: inline;
  margin: 1rem;
  background-color: ${props => (props.isActive ? "#dfe" : "#eee")};
  border-radius: 5px;
  padding: 0.8rem;
  cursor: default;
`;
