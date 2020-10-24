import React from "react";
import styled from "styled-components";
const Modal = ({ show, runningTime, fiveSecHelperIsClicked }) => {
  let imgName;
  let title;
  if (fiveSecHelperIsClicked) {
    runningTime = runningTime - 5000;
  }
  if (runningTime <= 30000) {
    imgName = require(`../images/chita.jpg`);
    title = "Congratulations! You are the fastest! Cheetah!";
  } else if (runningTime <= 45000) {
    imgName = require(`../images/gnu.jpg`);
    title = "Wow! You are fast! Gnu!";
  } else if (runningTime <= 60000) {
    imgName = require(`../images/horse.jpg`);
    title = "nice speed! Horse!";
  } else if (runningTime <= 80000) {
    imgName = require(`../images/sloth.jpg`);
    title = "You can do better! Sloth!";
  } else {
    imgName = require(`../images/turtle.jpg`);
    title = "You are so slow! Turtle!";
  }

  return (
    <ModalContainer imgName={imgName} show={show}>
      <Title>{title}</Title>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  /* position: fixed; */
  position: absolute;
  bottom: -110%;
  left: 0;
  height: 50vh;
  width: 99%;
  /* background-color: red; */
  transition: all 1s ease-out;
  /* opacity: 0; */
  /* transform: ${({ show }) =>
    show ? "translateY(0)" : "translateY(50rem)"}; */
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  background-image: url(${({ imgName }) => imgName});
  background-size: 100% 62%;
  background-repeat: no-repeat;
  text-align: center;

  @media (min-height: 737px) {
    background-size: 100% 55%;
    height: 45vh;
  }

  /* transform: ${({ show }) => (show ? "block" : "none")}; */
`;

const Title = styled.h1`
  margin-top: 60%;
`;

// const Img = styled.img`
//   height: 50vh;
//   width: 100%;
//   transform: translateX(-20rem);
// `;

/* linear-gradient(
      rgba(256, 256, 256, 0.5),
      rgba(256, 256, 256, 0.5)
    ), */
