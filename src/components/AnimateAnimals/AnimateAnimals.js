import React from "react";
import styled, { css } from "styled-components";
import { BIG_WIDTH_SCREEN } from "../../styles/variables";

const AnimateAnimals = ({ animalName, count }) => {
  return (
    <Container>
      <AnimaleMoving
        src={require(`../../images/${animalName}-logo.png`)}
        count={count - 1}
      />
      <FinishFlag src={require("../../images/finish-flag.png")} />
    </Container>
  );
};

export default AnimateAnimals;

const Container = styled.div`
  margin-top: 1rem;
  height: 10rem;
  width: 99%;
  background-image: url(${require("../../images/field.png")});
  background-size: 100% 100%;
  position: relative;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    order: -1;
    margin-top: 0;
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const AnimaleMoving = styled.img`
  height: 8rem;
  width: 12rem;
  margin-top: 2rem;
  transition: all 0.3s;
  transform: ${({ count }) =>
    css`
        translateX(${count * 4}%) 
      `};

  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    transform: ${({ count }) =>
      css`
        translateX(${count * 9}%) 
      `};
  }
`;

const FinishFlag = styled.img`
  height: 8rem;
  width: 4rem;
  position: absolute;
  right: 5%;
`;
