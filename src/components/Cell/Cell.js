import React from "react";
import styled, { css } from "styled-components";
import { flash, pulsate } from "../../styles/keyframes";
import { BIG_WIDTH_SCREEN } from "../../styles/variables";

const Cell = ({
  cell: { number, changed, finish },
  indexClicked,
  clicked,
  findHelperIndex,
}) => {
  return (
    <StyledButton
      indexClicked={indexClicked + 1}
      changed={changed}
      finish={finish}
      onClick={clicked}
      findHelperIndex={findHelperIndex + 1}
    >
      {number}
    </StyledButton>
  );
};

export default Cell;

const StyledButton = styled.button`
  width: 20%;
  height: 20%;
  background-color: ${({ changed }) => (changed ? "#e3e2e2" : "#eee")};
  opacity: ${({ finish }) => (finish ? "0" : "1")};
  visibility: ${({ finish }) => (finish ? "hidden" : "visible")};
  border: 2px solid white;
  padding: auto;
  font-size: 3rem;
  font-family: inherit;
  position: relative;
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
  &:nth-child(${({ indexClicked }) => indexClicked})::after {
    animation: ${({ changed, findHelperIndex }) =>
      changed &&
      findHelperIndex === 0 &&
      css`
        ${flash} 1s linear
      `};
  }

  &:nth-child(${({ findHelperIndex }) => findHelperIndex}) {
    animation: ${pulsate} 1s 3;
  }

  @media (min-width: ${BIG_WIDTH_SCREEN}) {
  }
`;
