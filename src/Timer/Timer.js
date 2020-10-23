import React, { useEffect, useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import Modal from "../Modal/Modal";

const Timer = ({
  btnClicked,
  handleRestartClicked,
  gameFinish,
  handleFindHelperClicked,
  findHelperIsClicked,
  count,
}) => {
  const [runningTime, setRunningTime] = useState(0);
  const [fiveSecHelperIsClicked, setFiveSecHelperIsClicked] = useState(false);
  let timer = useRef(null);
  useEffect(() => {
    if (btnClicked) {
      //   console.log("here in if..");
      const startTime = Date.now();
      timer.current = setInterval(() => {
        setRunningTime(Date.now() - startTime);
      }, 50);
    } else {
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [btnClicked]);

  const formatTime = (t) => {
    if (!fiveSecHelperIsClicked) {
      return (t / 1000).toFixed(2);
    } else {
      return (t / 1000 - 5).toFixed(2);
    }
  };

  const handleRestart = () => {
    setRunningTime(0.0);
    clearInterval(timer.current);
    setFiveSecHelperIsClicked(false);
    handleRestartClicked();
  };

  const handleFiveSecHelperClicked = () => {
    if (fiveSecHelperIsClicked === false && runningTime > 5000) {
      setFiveSecHelperIsClicked(true);
    }
  };

  // const formatTimeMinusFive = () => {
  //   return ((t / 1000)- 5000).toFixed(2);

  // }
  return (
    <>
      <TimerContainer animate={fiveSecHelperIsClicked}>
        <ClockImg src={require("../images/clock.png")} alt="Timer" />
        <TimerText>{formatTime(runningTime)}</TimerText>
        <NextNumber>{count}</NextNumber>
        <GameDetails>
          <RestartBtn onClick={handleRestart}>Restart</RestartBtn>
        </GameDetails>
        <HelpersBtns>
          <FindBtn
            onClick={handleFindHelperClicked}
            helper={!findHelperIsClicked}
          >
            Find
          </FindBtn>
          <FiveSecBtn
            onClick={handleFiveSecHelperClicked}
            fiveSecClicked={fiveSecHelperIsClicked}
            runningTime={runningTime}
          >
            -5 Sec
          </FiveSecBtn>
        </HelpersBtns>
      </TimerContainer>
    </>
  );
};

export default Timer;

const showFiveSec = keyframes` 
  0% {
    opacity: 0;
    /* box-shadow: none; */

  }
  50% {
    opacity: 1;
    transform: translateX(7rem);

  }
  100% {
    opacity: 0;
    transform: translateX(7rem);

  }
`;

const TimerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

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
  height: 60rem;
  width: 60rem;
  background-color: transparent;

  @media (max-width: 600px) {
    /* font-size: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    height: 20rem;
    width: 20rem;
    margin-top: 2rem;
  }
`;

const TimerText = styled.label`
  font-size: 4rem;
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const GameDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;

const HelpersBtns = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Btn = styled.button`
  border: none;
  padding: 1rem 2rem;
  margin-right: 1rem;
  font-size: 2rem;
  font-family: inherit;
  text-transform: uppercase;
  border-radius: 0.4rem;

  &:focus {
    outline: none;
  }
`;

const RestartBtn = styled(Btn)`
  font-size: 2.5rem;
  background-color: #f26767;
  /* box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2); */
  margin-right: 1rem;
  font-family: inherit;
`;

const FindBtn = styled(Btn)`
  background-color: ${({ helper }) => (helper ? "#686f87" : "#aca9a9")};
  text-decoration: ${({ helper }) => (helper ? "none" : "line-through")};
`;

const NextNumber = styled.label`
  font-size: 3rem;
  padding: 0.4rem 2rem;
  border: 2px solid #f68d69;
  border-radius: 50%;
  position: absolute;
  left: 0;
  bottom: 30%;
`;
const FiveSecBtn = styled(Btn)`
  margin: 0;
  background-color: ${({ runningTime, fiveSecClicked }) =>
    runningTime > 5000 && !fiveSecClicked ? "#438c4c" : "#aca9a9"};
  text-decoration: ${({ runningTime, fiveSecClicked }) =>
    runningTime > 5000 && !fiveSecClicked ? "none" : "line-through"};
`;
// const FindBtn = styled(FindBtn)`
//   background-color: blue;
// `;

// import React, { useEffect, useState, useRef } from "react";

// const Timer = ({ btnClicked, handleClick }) => {
//   const [runningTime, setRunningTime] = useState(0);
//   const timer = useRef();

//   useEffect(() => {
//     //   if(btnClicked === false) {

//     //   }
//     const startTime = Date.now();

//     return () => {
//       clearInterval(timerId);
//     };
//   }, [btnClicked]);

//   const handleStartStopClick = () => {
//     if (btnClicked) {
//       clearInterval(timer);
//     } else {
//       timer = setInterval(() => {
//         setRunningTime(Date.now() - startTime);
//       }, 100);
//     }
//     handleClick();
//   };

//   const formatTime = (t) => {
//     return (t / 1000).toFixed(1);
//   };
//   return (
//     <div>
//       <h1>{formatTime(runningTime)}</h1>
//     </div>
//   );
// };

// export default Timer;
