import React from "react";
import styled, { css } from "styled-components";

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
`;

const FinishFlag = styled.img`
  height: 8rem;
  width: 4rem;
  position: absolute;
  right: 5%;
`;
