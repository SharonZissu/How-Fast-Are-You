import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";

const Timer = ({ btnClicked, handleRestartClicked, gameFinish }) => {
  const [runningTime, setRunningTime] = useState(0.0);
  let timer = useRef();

  useEffect(() => {
    if (btnClicked) {
      //   console.log("here in if..");
      const startTime = Date.now();
      timer = setInterval(() => {
        setRunningTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [btnClicked]);

  const formatTime = (t) => {
    return (t / 1000).toFixed(2);
  };

  const handleRestart = () => {
    clearInterval(timer);
    setRunningTime(0.0);
    handleRestartClicked();
  };
  return (
    <>
      <TimerContainer>
        <ClockImg src={require("../images/clock.png")} alt="Timer" />
        <TimerText>{formatTime(runningTime)}</TimerText>
        <RestartBtn onClick={handleRestart}>Restart</RestartBtn>
      </TimerContainer>
      <Modal show={gameFinish} />
    </>
  );
};

export default Timer;

const TimerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RestartBtn = styled.button`
  padding: 1rem 2rem;
  border: none;
  font-size: 3rem;
  background-color: #f26767;
  margin-top: 2rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  border-radius: 0.4rem;
`;

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
