import React from "react";
import styled from "styled-components";

const Button = ({ cell: { number, changed, finish }, clicked }) => {
  //   console.log(cell);
  return (
    <StyledButton changed={changed} finish={finish} onClick={clicked}>
      {number}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  width: 20%;
  height: 20%;
  background-color: ${({ changed }) => (changed ? "#e3e2e2" : "#eee")};
  opacity: ${({ finish }) => (finish ? "0" : "1")};
  border: 2px solid white;
  padding: auto;
  font-size: 4rem;
  /* font-family: inherit; */
  vertical-align: middle;

  &:focus {
    outline: none;
  }
`;
