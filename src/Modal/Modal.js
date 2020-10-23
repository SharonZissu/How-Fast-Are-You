import React from "react";
import styled from "styled-components";
const Modal = ({ show }) => {
  return <ModalContainer show={show}></ModalContainer>;
};

export default Modal;

const ModalContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50vh;
  width: 100vh;
  background-color: red;
  transition: all 2s;
  /* opacity: 0; */
  margin-bottom: 1rem;
  transform: ${({ show }) => (show ? "translateY(0)" : "translateY(50rem)")};
  /* transform: ${({ show }) => (show ? "block" : "none")}; */
`;
