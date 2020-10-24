import React, { useState } from "react";
import styled from "styled-components";
import Backdrop from "../Backdrop/Backdrop";

const TimesBar = () => {
  const [timesBarClicked, setTimesBarClicked] = useState(false);

  const handleTimesBarClicked = () => {
    setTimesBarClicked(!timesBarClicked);
  };

  const exitTimerBar = () => {
    setTimesBarClicked(false);
  };
  return (
    <>
      <Backdrop show={timesBarClicked} exitTimerBar={exitTimerBar} />
      <Container onClick={handleTimesBarClicked} clicked={timesBarClicked}>
        <TimesLabel>Times</TimesLabel>
        <List clicked={timesBarClicked}>
          <AnimalItem>
            <Img src={require("../images/chita-logo.png")} />
            <Time>{`<= 30 Seconds`}</Time>
          </AnimalItem>
          <AnimalItem>
            <Img src={require("../images/gnu-logo.png")} />
            <Time>{`<= 40 Seconds`}</Time>
          </AnimalItem>
          <AnimalItem>
            <Img src={require("../images/horse-logo.png")} />
            <Time>{`<= 50 Seconds`}</Time>
          </AnimalItem>
          <AnimalItem>
            <Img src={require("../images/elephant-logo.png")} />
            <Time>{`<= 65 Seconds`}</Time>
          </AnimalItem>
          <AnimalItem>
            <Img src={require("../images/sloth-logo.png")} />
            <Time>{`<= 85 Seconds`}</Time>
          </AnimalItem>
          <AnimalItem>
            <Img src={require("../images/turtle-logo.png")} />
            <Time>{`> 85 Seconds`}</Time>
          </AnimalItem>
        </List>
      </Container>
    </>
  );
};

export default TimesBar;

const Container = styled.div`
  position: fixed;
  width: ${({ clicked }) => (clicked ? "80%" : "3rem")};
  /* transform: ${({ clicked }) => (clicked ? "scaleY(4)" : "scaleY(1)")}; */
  height: ${({ clicked }) => (clicked ? "31rem" : "6rem")};
  /* transform-origin: top; */

  /* height: 6rem; */
  z-index: 500;
  background-color: #f68d69;
  top: 18%;
  right: 0;
  /* transition: transform 0.5s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.5s; */
  transition: height 0.5s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.5s,
    box-shadow 0.5s 1s;
  overflow: hidden;
  box-shadow: ${({ clicked }) =>
    clicked ? "0 1rem 2rem rgba(0, 0, 0, 0.4)" : "none"};
`;

const TimesLabel = styled.label`
  font-size: 1.5rem;
  position: absolute;
  top: 1.7rem;
  right: -0.5rem;
  transform: rotate(-90deg) scaleY(1);
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
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 1rem 2rem;
  transform: rotate(0) scaleY(1);
  opacity: ${({ clicked }) => (clicked ? "1" : "0")};
  transition: all 0.4s 0.7s;
  padding-right: 0;
`;

const AnimalItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 501;
  &:not(:last-child) {
    margin-bottom: 0.4rem;
  }
`;

const Img = styled.img`
  height: 4.5rem;
  width: 7rem;
`;

const Time = styled.label`
  font-size: 1.7rem;
`;
