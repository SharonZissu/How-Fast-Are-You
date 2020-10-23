import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";

const Timer = ({
  btnClicked,
  handleRestartClicked,
  gameFinish,
  handleFindHelperClicked,
  findHelperIsClicked,
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
      <TimerContainer>
        <ClockImg src={require("../images/clock.png")} alt="Timer" />
        <TimerText>{formatTime(runningTime)}</TimerText>
        <RestartBtn onClick={handleRestart}>Restart</RestartBtn>
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
  top: 38%;
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

const HelpersBtns = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Btn = styled.button`
  border: none;
  padding: 1rem 2rem;
  margin-right: 1rem;
  font-size: 2rem;
  &:focus {
    outline: none;
  }
`;
const FindBtn = styled(Btn)`
  background-color: ${({ helper }) => (helper ? "red" : "grey")};
  text-decoration: ${({ helper }) => (helper ? "none" : "line-through")};
`;
const FiveSecBtn = styled(Btn)`
  margin: 0;
  background-color: ${({ runningTime, fiveSecClicked }) =>
    runningTime > 5000 && !fiveSecClicked ? "green" : "grey"};
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
