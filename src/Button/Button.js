import React from "react";
import styled from "styled-components";

const Button = ({ id, clicked }) => {
  return <StyledButton onClick={clicked}>{id}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  width: 20%;
  height: 20%;
  background-color: #eee;
  border: 2px solid white;
  padding: auto;
  font-size: 4rem;
  font-family: inherit;
  vertical-align: middle;

  &:focus {
    outline: none;
  }
`;
