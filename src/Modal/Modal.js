import React from "react";
import styled from "styled-components";
const Modal = ({ show, runningTime, fiveSecHelperIsClicked }) => {
  let imgName;
  let title;
  console.log(runningTime);
  if (fiveSecHelperIsClicked) {
    runningTime = runningTime - 5000;
  }
  if (runningTime < 30000) {
    imgName = require(`../images/chita.jpg`);
    title = "Congratulations! You are the fastest! Cheetah!";
  } else if (runningTime < 45000) {
    imgName = require(`../images/gnu.jpg`);
    title = "Wow! You are fast! Gnu!";
  } else if (runningTime < 60000) {
    imgName = require(`../images/horse.jpg`);
    title = "nice speed! Horse!";
  } else if (runningTime < 80000) {
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
  bottom: -115%;
  left: 0;
  height: 50vh;
  width: 100%;
  /* background-color: red; */
  transition: all 2s;
  /* opacity: 0; */
  /* transform: ${({ show }) =>
    show ? "translateY(0)" : "translateY(50rem)"}; */
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  background-image: url(${({ imgName }) => imgName});
  background-size: 100% 65%;
  background-repeat: no-repeat;

  /* transform: ${({ show }) => (show ? "block" : "none")}; */
`;

const Title = styled.h1`
  margin-top: 65%;
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
