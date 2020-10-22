import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const Timer = ({ btnClicked, handleRestartClicked }) => {
  const [runningTime, setRunningTime] = useState(0.0);
  let timer = useRef();

  useEffect(() => {
    if (btnClicked) {
      console.log("here in if..");
      const startTime = Date.now();
      timer = setInterval(() => {
        setRunningTime(Date.now() - startTime);
      }, 100);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [btnClicked]);

  const formatTime = (t) => {
    return (t / 1000).toFixed(1);
  };

  const handleRestart = () => {
    clearInterval(timer);
    setRunningTime(0.0);
    handleRestartClicked();
  };
  return (
    <TimerContainer>
      <ClockImg src={require("../images/clock.png")} alt="Timer" />
      <TimerText>{formatTime(runningTime)}</TimerText>
      <RestartBtn onClick={handleRestart}>Restart</RestartBtn>
    </TimerContainer>
  );
};

export default Timer;

const TimerContainer = styled.div`
  position: relative;
`;
const ClockImg = styled.img`
  height: 17rem;
  width: 15rem;
  background-color: transparent;
`;

const TimerText = styled.label`
  font-size: 4rem;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RestartBtn = styled.button``;

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
