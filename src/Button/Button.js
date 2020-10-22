import React, { useRef } from "react";
import styled, { keyframes, css } from "styled-components";

const Button = ({
  cell: { number, changed, finish },
  indexClicked,
  clicked,
}) => {
  //   console.log(cell);
  console.log("indexClicked:", indexClicked);
  return (
    <StyledButton
      indexClicked={indexClicked}
      changed={changed}
      finish={finish}
      onClick={clicked}
    >
      {number}
    </StyledButton>
  );
};

export default Button;

const flash = keyframes`
0% {
    opacity: 1;
}
100% {
    opacity: 0;
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
  position: relative;
  /* font-family: inherit; */
  vertical-align: middle;
  &:focus {
    outline: none;
  }
  &::after {
    content: "";
    position: absolute;
    background-color: white;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
  }
  &:nth-child(${({ indexClicked }) => indexClicked + 1})::after {
    animation: ${({ changed }) =>
      changed &&
      css`
        ${flash} 1s linear
      `};
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
