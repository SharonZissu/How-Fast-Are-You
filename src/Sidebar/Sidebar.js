import React, { useContext } from "react";
import styled from "styled-components";
import { animals } from "../utills";
import { BIG_WIDTH_SCREEN } from "../styles/variables";

//context
import { SidebarContext } from "../sidebar-context";

//components
import Backdrop from "../components/Backdrop/Backdrop";

const Sidebar = ({ type }) => {
  const {
    timesBarClicked,
    rulesBarClicked,
    handleSidebarClicked,
    exitSiderBar,
  } = useContext(SidebarContext);
  return (
    <>
      <Backdrop
        show={type === "times" ? timesBarClicked : rulesBarClicked}
        exitSiderBar={exitSiderBar}
      />
      <Container
        type={type}
        onClick={
          type === "times"
            ? () => handleSidebarClicked("times")
            : () => handleSidebarClicked("rules")
        }
        clicked={type === "times" ? timesBarClicked : rulesBarClicked}
      >
        <Label>{type === "times" ? "Times" : "Rules"}</Label>
        {type === "times" && (
          <>
            <List clicked={timesBarClicked}>
              {animals.map((animal) => (
                <AnimalItem key={animal.name}>
                  <Img src={require(`../images/${animal.name}-logo.png`)} />
                  <Time>{animal.time}</Time>
                </AnimalItem>
              ))}
            </List>
          </>
        )}

        {type === "rules" && (
          <RulesDiv clicked={rulesBarClicked}>
            <P> The target is to touch from 1 to 50 as fast as you can.</P>
            <P>
              {" "}
              The circle next to the timer indicates the next number you need to
              touch.
            </P>
            <P>
              You have 2 help buttons that you can use only one time in each
              round:
            </P>
            <P>
              1. If you get stuck, the <FindSpan>FIND</FindSpan> button helps
              you to find the next number you need to touch.
            </P>
            <P>
              2. If you managed to touch the first 25 numbers in less than 30
              seconds, the <Sec5Span>-5 SEC</Sec5Span> button opens and stays
              open until you reach a total of 30 seconds. With its help 5
              seconds will be substracted from your time.
            </P>
          </RulesDiv>
        )}
      </Container>
    </>
  );
};

export default Sidebar;

const Container = styled.div`
  position: absolute;
  width: ${({ clicked }) => (clicked ? "80%" : "3rem")};
  height: ${({ clicked }) => (clicked ? "31rem" : "6rem")};
  z-index: 500;
  background-color: ${({ type }) => (type === "times" ? "#f68d69" : "#f26767")};
  top: ${({ type }) => (type === "times" ? "23%" : "15%")};
  right: 0;
  transition: height 0.4s cubic-bezier(1, 0, 0, 1) 0.5s, width 0.5s,
    box-shadow 0.5s 1s;
  overflow: hidden;
  box-shadow: ${({ clicked }) =>
    clicked ? "0 1rem 2rem rgba(0, 0, 0, 0.4)" : "none"};

  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    width: 45%;
    background-color: red;
    right: ${({ type }) => (type === "times" ? "1rem" : "none")};
    left: ${({ type }) => (type === "rules" ? "1rem" : "none")};
    top: 10rem;
    height: 15rem;
    background-color: #eee;
    border: 2px dashed black;
    outline-offset: 1px;
    outline: 3px solid orange;
  }
`;

const Label = styled.label`
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
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    /* opacity: 0; */
    transform: none;
    position: relative;
    top: 0;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 1rem 2rem;
  transform: rotate(0) scaleY(1);
  opacity: ${({ clicked }) => (clicked ? "1" : "0")};
  transition: all 0.4s 0.8s;
  padding-right: 0;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    opacity: 1;
    width: 100%;
    align-items: flex-end;
    justify-content: center;
    position: absolute;
    top: 0;
    padding: 0.2rem 0.6rem;
    height: 100%;
    padding-top: 0;
  }
`;

const AnimalItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 501;
  &:not(:last-child) {
    margin-bottom: 0.4rem;
  }
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    width: 50%;
  }
`;

const Img = styled.img`
  height: 4.5rem;
  width: 7rem;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    height: 2rem;
    width: 4rem;
  }
`;

const Time = styled.label`
  font-size: 1.7rem;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    font-size: 1rem;
  }
`;

const RulesDiv = styled.div`
  padding: 1rem;
  padding-right: 2.2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: ${({ clicked }) => (clicked ? "1" : "0")};
  transition: all 0.4s 0.8s;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    opacity: 1;
    padding: 0.7rem;
    justify-content: flex-start;
    height: auto;
  }
`;

const P = styled.p`
  font-size: 1.1rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
    @media (min-width: ${BIG_WIDTH_SCREEN}) {
      margin-bottom: 0.4rem;
    }
  }
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    font-size: 0.65rem;
  }
`;

const Span = styled.span`
  padding: 0.1rem 0.25rem;
  border-radius: 3px;
`;

const FindSpan = styled(Span)`
  background-color: #686f87;
`;

const Sec5Span = styled(Span)`
  background-color: #438c4c;
`;
