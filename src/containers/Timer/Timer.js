import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
import styled, { css } from "styled-components";
import { showFiveSec } from "../../styles/keyframes";
import { formatTime } from "../../utills";
import { TimerContext } from "../../timer-context";
import { BIG_WIDTH_SCREEN } from "../../styles/variables";
//components
import TopScores from "../../components/TopScores/TopScores";
import Buttons from "../../components/Buttons/Buttons";
import AnimateAnimals from "../../components/AnimateAnimals/AnimateAnimals";

const Timer = ({
  count,
  gameStart,
  gameFinish,
  handleRestartBtnClicked,
  handleFindHelperClicked,
  findHelperIsClicked,
}) => {
  // const [runningTime, setRunningTime] = useState(1);
  const [fiveSecHelperIsClicked, setFiveSecHelperIsClicked] = useState(false);
  const [animalName, setAnimalName] = useState("chita");
  const { timer, runningTime, setRunningTime } = useContext(TimerContext);
  let averageTimer = useRef(null);

  useEffect(() => {
    //useEffect for the animals animation
    if (count === 51) {
      //for the last change when click the last cell
      checkEndAnimal(runningTime);
    }

    if (gameStart) {
      //the interval starts when the timer interval starts
      averageTimer.current = setInterval(() => {
        let average;
        if (fiveSecHelperIsClicked) {
          average = ((runningTime - 5000) / 1000).toFixed(2) / count;
        } else {
          average = (runningTime / 1000).toFixed(2) / count;
        }
        checkAverage(average);
      }, 50);
    }

    return () => {
      clearInterval(averageTimer.current);
    };
  }, [count, fiveSecHelperIsClicked]);

  const checkAverage = (average) => {
    let animalName;
    if (average <= 0.6) {
      animalName = "chita";
    } else if (average <= 0.8) {
      animalName = "gnu";
    } else if (average <= 1) {
      animalName = "horse";
    } else if (average <= 1.3) {
      animalName = "elephant";
    } else if (average <= 1.7) {
      animalName = "sloth";
    } else {
      animalName = "turtle";
    }
    setAnimalName(animalName);
  };

  const checkEndAnimal = () => {
    let animalName;
    let time = runningTime;
    if (fiveSecHelperIsClicked) {
      time = time - 5000;
    }
    if (time <= 30000) {
      animalName = "chita";
    } else if (time <= 40000) {
      animalName = "gnu";
    } else if (time <= 50000) {
      animalName = "horse";
    } else if (time <= 65000) {
      animalName = "elephant";
    } else if (time <= 85000) {
      animalName = "sloth";
    } else {
      animalName = "turtle";
    }
    setAnimalName(animalName);
  };

  const handleRestart = () => {
    setRunningTime(0.0);
    clearInterval(timer.current);
    setFiveSecHelperIsClicked(false);
    setAnimalName("chita");
    handleRestartBtnClicked(); //restart all the state of the Game component
  };

  const handleFiveSecHelperClicked = () => {
    if (!fiveSecHelperIsClicked && runningTime <= 30000 && count > 25) {
      setFiveSecHelperIsClicked(true);
    }
  };

  return (
    <TimerContainer animate={fiveSecHelperIsClicked}>
      <TimerTime>{formatTime(runningTime, fiveSecHelperIsClicked)}</TimerTime>
      <NextNumberCircle showCount={count === 51 ? false : true}>
        {count}
      </NextNumberCircle>
      <ClockImg src={require("../../images/clock.png")} alt="Timer" />

      <Buttons
        handleRestart={handleRestart}
        handleFindHelperClicked={handleFindHelperClicked}
        findHelperIsClicked={findHelperIsClicked}
        handleFiveSecHelperClicked={handleFiveSecHelperClicked}
        fiveSecHelperIsClicked={fiveSecHelperIsClicked}
        count={count}
      />

      <AnimateAnimals animalName={animalName} count={count} />
      {gameFinish && (
        <TopScores
          show={gameFinish}
          fiveSecHelperIsClicked={fiveSecHelperIsClicked}
        />
      )}
    </TimerContainer>
  );
};

export default Timer;

const TimerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    margin-top: 17rem;
    align-items: flex-start;
  }

  &::after {
    content: "-5:00";
    position: absolute;
    color: #438c4c;
    top: 20%;
    left: 60%;
    font-size: 2rem;
    opacity: 0;
    animation: ${({ animate }) =>
      animate &&
      css`
        ${showFiveSec} 1.5s linear
      `};
  }
`;

const ClockImg = styled.img`
  height: 17rem;
  width: 17rem;
  margin-top: 2rem;

  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    height: 20rem;
    width: 20rem;
    background-color: transparent;
    margin-left: 10%;
    margin-top: 1.4rem;
  }
`;

const TimerTime = styled.label`
  font-size: 3rem;
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    left: 14rem;
    bottom: 0;
    top: 56%;
    transform: none;
  }
`;

const NextNumberCircle = styled.label`
  font-size: 3rem;
  padding: 0.4rem 2rem;
  border: 2px solid #f68d69;
  border-radius: 50%;
  position: absolute;
  left: 0;
  bottom: 50%;
  opacity: ${({ showCount }) => (showCount ? "1" : "0")};
`;
