import React, { useState, useEffect } from "react";
import styled from "styled-components";
const Modal = ({ show, runningTime, fiveSecHelperIsClicked }) => {
  const [top5, setTop5] = useState([]);
  useEffect(() => {
    if (show) {
      const top5results = JSON.parse(localStorage.getItem("top5results"));
      if (fiveSecHelperIsClicked) {
        runningTime = runningTime - 5000;
      }
      // console.log("top5results FROM if(show)", top5results);
      if (!top5results) {
        console.log("top5results FROM if(!top5results)", top5results);

        setTop5([{ time: runningTime, animal: checkWhichAnimal(runningTime) }]);
        localStorage.setItem("top5results", JSON.stringify([runningTime]));
      } else if (top5results.length < 5) {
        console.log("top5results FROM if(top5results.length < 5)", top5results);
        localStorage.setItem(
          "top5results",
          JSON.stringify([...top5results, runningTime])
        );
        console.log(("TOP5:", top5));
        const newArr = top5results.map((res) => ({
          time: res,
          animal: checkWhichAnimal(res),
        }));
        setTop5([
          ...newArr,
          { time: runningTime, animal: checkWhichAnimal(runningTime) },
        ]);
      } else if (top5results.length == 5) {
        // console.log(top5results);
        // let isCurrestResultBetter = false;
        top5results.push(runningTime);
        top5results.sort();
        top5results.slice(0, 5);
        localStorage.setItem("top5results", JSON.stringify(top5results));

        const sortedArray = [];
        for (let i = 0; i < 5; i++) {
          sortedArray.push({
            time: top5results[i],
            animal: checkWhichAnimal(top5results[i]),
          });
        }
        setTop5(sortedArray);
      }
    }
  }, [show]);
  let animal;

  const checkWhichAnimal = (time) => {
    console.log(time);
    // if (fiveSecHelperIsClicked) {
    //   time = time - 5000;
    // }
    if (time <= 30000) {
      animal = "chita";
    } else if (time <= 40000) {
      animal = "gnu";
    } else if (time <= 50000) {
      animal = "horse";
    } else if (time <= 65000) {
      animal = "elephant";
    } else if (time <= 85000) {
      animal = "sloth";
    } else {
      animal = "turtle";
    }
    return animal;
  };

  return (
    <ModalContainer show={show}>
      <List>
        <Title>Your Top 5 Scores:</Title>
        {top5.map((res) => (
          <ResultItem>
            <AnimalPicture src={require(`../images/${res.animal}-logo.png`)} />
            <ResultTime>{(res.time / 1000).toFixed(2)}</ResultTime>
          </ResultItem>
        ))}
      </List>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  /* position: fixed; */
  position: absolute;
  bottom: -100%;
  left: 0;
  height: 48vh;
  width: 99%;
  transition: all 1s ease-out;
  /* opacity: 0; */
  /* transform: ${({ show }) =>
    show ? "translateY(0)" : "translateY(50rem)"}; */
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  background-image: url(${({ imgName }) => imgName});
  background-size: 100% 62%;
  background-repeat: no-repeat;
  text-align: center;

  @media (min-height: 737px) {
    background-size: 100% 55%;
    height: 45vh;
  }

  /* transform: ${({ show }) => (show ? "block" : "none")}; */
`;

const List = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ResultItem = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const AnimalPicture = styled.img`
  height: 4.5rem;
  width: 7rem;
`;

const ResultTime = styled.label`
  font-size: 3rem;
`;
// const Img = styled.img`
//   height: 50vh;
//   width: 100%;
//   transform: translateX(-20rem);
// `;

/* linear-gradient(
      rgba(256, 256, 256, 0.5),
      rgba(256, 256, 256, 0.5)
    ), */
