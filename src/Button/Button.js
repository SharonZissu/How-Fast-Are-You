import React from "react";
import styled, { keyframes, css } from "styled-components";

const Button = ({ cell: { number, changed, finish }, clicked }) => {
  //   console.log(cell);
  return (
    <StyledButton changed={changed} finish={finish} onClick={clicked}>
      {number}
    </StyledButton>
  );
};

export default Button;

const backgroundChanged = keyframes`
0% {
    background-color: red;
}
100% {
    background-color: #e3e2e2;
}

`;
const StyledButton = styled.button`
  width: 20%;
  height: 20%;
  background-color: ${({ changed }) => (changed ? "#e3e2e2" : "#eee")};
  opacity: ${({ finish }) => (finish ? "0" : "1")};
  visibility: ${({ finish }) => (finish ? "hidden" : "visible")};
  border: 2px solid white;
  padding: auto;
  font-size: 4rem;
  /* font-family: inherit; */
  vertical-align: middle;
  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    font-size: 3rem;
  }
`;

// const animate = css`
// `
// const complexMixin = css`
//   color: ${props => (props.whiteColor ? 'white' : 'black')};
// ` ``;
