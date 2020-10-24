import React from "react";
import styled from "styled-components";

const Backdrop = ({ show, exitTimerBar }) => {
  return <Container show={show} onClick={exitTimerBar}></Container>;
};

export default Backdrop;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: ${({ show }) => (show ? "0.8" : "0")};
  position: fixed;
  z-index: ${({ show }) => (show ? "400" : "-1")};
  transition: all 0.9s;
`;
