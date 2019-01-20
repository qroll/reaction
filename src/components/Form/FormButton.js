import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { GRAY } from "src/styles";

const Button = styled.button`
  border: 1px solid ${GRAY.LIGHT};
  border-radius: 0.25rem;
  font-size: 1rem;
  margin: 10px;
  outline: none;
  padding: 0.5rem;
  width: fit-content;

  &:hover {
    background-color: ${GRAY.LIGHTER};
    border: 1px solid ${GRAY.DARK};
  }
`;

const FormButton = props => {
  let { label, onClick, id } = props;
  return (
    <Button id={`button-${id}`} onClick={onClick}>
      {label}
    </Button>
  );
};

FormButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  id: PropTypes.string
};

FormButton.defaultProps = {
  label: "",
  onClick: () => {}
};

export default FormButton;
