import React, { useState } from "react";
import styled from "styled-components";
import Backdrop from "../Backdrop/Backdrop";

const TimesBar = () => {
  const [timesBarClicked, setTimesBarClicked] = useState(false);

  const handleTimesBarClicked = () => {
    setTimesBarClicked(true);
  };

  const exitTimerBar = () => {
    setTimesBarClicked(false);
  };
  return (
    <>
      <Backdrop show={timesBarClicked} exitTimerBar={exitTimerBar} />
      <Container onClick={handleTimesBarClicked} clicked={timesBarClicked}>
        <label>Times</label>
      </Container>
    </>
  );
};

export default TimesBar;

const Container = styled.div`
  position: fixed;
  width: ${({ clicked }) => (clicked ? "80%" : "3rem")};
  /* transform: ${({ clicked }) => (clicked ? "scaleY(4)" : "scaleY(1)")}; */
  height: ${({ clicked }) => (clicked ? "25rem" : "6rem")};
  /* transform-origin: top; */

  /* height: 6rem; */
  z-index: 500;
  background-color: #f68d69;
  top: 20%;
  right: 0;
  /* transition: transform 0.5s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.5s; */
  transition: height 0.5s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.5s;

  label {
    font-size: 1.5rem;
    position: absolute;
    top: 1.7rem;
    right: -0.5rem;
    transform: rotate(-90deg) scaleY(1) !important;
    transition: all 0.2s 1s;
    opacity: ${({ clicked }) => (clicked ? "0" : "1")};

    /* Legacy vendor prefixes that you probably don't need... */

    /* Safari */
    -webkit-transform: rotate(-90deg);

    /* Firefox */
    -moz-transform: rotate(-90deg);

    /* IE */
    -ms-transform: rotate(-90deg);

    /* Opera */
    -o-transform: rotate(-90deg);
  }
`;
