////////////////////////////////////////////////////////////////////////////////
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
  const [runningTime, setRunningTime] = useState(1);
  const [fiveSecHelperIsClicked, setFiveSecHelperIsClicked] = useState(false);
  const [average, setAverage] = useState(0);
  const [animal, setAnimal] = useState("");
  const [animalName, setAnimalName] = useState("chita");
  let averageTimer = useRef(null);
  // let animalsTimer = useRef(null);
  let timer = useRef(null);
  // let restart = useRef(null);
  useEffect(() => {
    if (btnClicked) {
      //   console.log("here in if..");
      const startTime = Date.now();
      timer.current = setInterval(() => {
        // console.log(((Date.now() - startTime) / 1000).toFixed(2) / count);
        setRunningTime(Date.now() - startTime);
        // let average = ((Date.now() - startTime) / 1000).toFixed(2) / count;
        // console.log(average);
      }, 50);
    } else {
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
      // clearTimeout(restart.current);
    };
  }, [btnClicked]);

  useEffect(() => {
    if (count === 51) {
      checkEndAnimal(runningTime);
    }
    if (btnClicked) {
      //|| count === 51
      let animalName;

      if (count === 50) {
        // if (fiveSecHelperIsClicked) {
        //   time = time - 5000;
        // }
        return;
      }
      console.log("Here in useEffect, count is:", count);
      averageTimer.current = setInterval(() => {
        let checkAverage;
        if (fiveSecHelperIsClicked) {
          setAverage(((runningTime - 5000) / 1000).toFixed(2) / count);
          checkAverage = ((runningTime - 5000) / 1000).toFixed(2) / count;
        } else {
          setAverage((runningTime / 1000).toFixed(2) / count);
          checkAverage = (runningTime / 1000).toFixed(2) / count;
        }

        console.log("checkAverage:", checkAverage);

        if (checkAverage <= 0.6) {
          animalName = "chita";
        } else if (checkAverage <= 0.8) {
          animalName = "gnu";
        } else if (checkAverage <= 1) {
          animalName = "horse";
        } else if (checkAverage <= 1.3) {
          animalName = "elephant";
        } else if (checkAverage <= 1.7) {
          animalName = "sloth";
        } else {
          animalName = "turtle";
        }
        setAnimalName(animalName);
      }, 50);
    }

    return () => {
      clearInterval(averageTimer.current);
    };
  }, [count, fiveSecHelperIsClicked]);

  const checkEndAnimal = () => {
    let animalName;
    if (runningTime <= 30000) {
      animalName = "chita";
    } else if (runningTime <= 40000) {
      animalName = "gnu";
    } else if (runningTime <= 50000) {
      animalName = "horse";
    } else if (runningTime <= 65000) {
      animalName = "elephant";
    } else if (runningTime <= 85000) {
      animalName = "sloth";
    } else {
      animalName = "turtle";
    }
    setAnimalName(animalName);
    return;
  };

  const formatTime = (t) => {
    if (!fiveSecHelperIsClicked) {
      return (t / 1000).toFixed(2);
    } else {
      return (t / 1000 - 5).toFixed(2);
    }
  };

  const handleRestart = () => {
    clearInterval(timer.current);
    setFiveSecHelperIsClicked(false);
    setAnimalName("chita");
    setRunningTime(0.0);
    handleRestartClicked();
    // if (gameFinish) {
    //   restart.current = setTimeout(() => {
    //     setRunningTime(0.0);
    //   }, 1000);
    // } else {
    //   setRunningTime(0.0);
    // }
  };

  const handleFiveSecHelperClicked = () => {
    if (!fiveSecHelperIsClicked && runningTime <= 30000 && count > 25) {
      setFiveSecHelperIsClicked(true);
    }
  };

  // const formatTimeMinusFive = () => {
  //   return ((t / 1000)- 5000).toFixed(2);

  // }

  return (
    <>
      <TimerContainer animate={fiveSecHelperIsClicked}>
        <TimerText>{formatTime(runningTime)}</TimerText>
        <NextNumber>{count === 51 ? "50" : count}</NextNumber>
        <GameDetails>
          <ClockImg src={require("../images/clock.png")} alt="Timer" />
        </GameDetails>
        <HelpersBtns>
          <RestartBtn onClick={handleRestart}>Restart</RestartBtn>

          <FindBtn
            onClick={handleFindHelperClicked}
            helper={!findHelperIsClicked}
          >
            Find
          </FindBtn>
          <FiveSecBtn
            onClick={handleFiveSecHelperClicked}
            show={!fiveSecHelperIsClicked && runningTime <= 30000 && count > 25}
          >
            -5 Sec
          </FiveSecBtn>
        </HelpersBtns>
        <AnimateContainer>
          <AnimaleMoving
            src={require(`../images/${animalName}-logo.png`)}
            animal={animal}
            count={count - 1}
          />
          <FinishFlag src={require("../images/finish-flag.png")} />
        </AnimateContainer>
        <Modal
          show={gameFinish}
          runningTime={runningTime}
          fiveSecHelperIsClicked={fiveSecHelperIsClicked}
        />
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
    height: 17rem;
    width: 17rem;
    /* margin-top: 2rem; */
  }
`;

const TimerText = styled.label`
  font-size: 3rem;
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const GameDetails = styled.div`
  display: flex;
  align-items: flex-end;
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
  bottom: 50%;
`;
const FiveSecBtn = styled(Btn)`
  margin: 0;
  background-color: ${({ show }) => (show ? "#438c4c" : "#aca9a9")};
  text-decoration: ${({ show }) => (show ? "none" : "line-through")};
`;

const AnimateContainer = styled.div`
  /* background-color: red; */
  margin-top: 1rem;
  height: 10rem;
  width: 99%;
  /* display: flex; */
  /* justify-content: flex-start; */
  background-image: url(${require("../images/field.png")});
  background-size: 100% 100%;
  position: relative;
  /* text-align: start; */
`;

const AnimaleMoving = styled.img`
  height: 8rem;
  width: 12rem;
  margin-top: 2rem;
  transition: all 0.3s;
  transform: ${({ count }) =>
    css`
        translateX(${count * 4}%) 
      `};
`;

const FinishFlag = styled.img`
  height: 8rem;
  width: 4rem;
  position: absolute;
  right: 5%;
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
