import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { v4 as uuid_v4 } from "uuid";
import { TimerContext } from "../../timer-context";
import { formatTime } from "../../utills";
import { SMALL_WIDTH_SCREEN } from "../../styles/variables";

const TopScores = ({ show, fiveSecHelperIsClicked }) => {
  const [top5, setTop5] = useState([]);
  const { runningTime } = useContext(TimerContext);

  useEffect(() => {
    // console.log("runningTime", runningTime);
    const runningTimeDisplay = formatTime(runningTime, fiveSecHelperIsClicked);
    // console.log("runningTimeDisplay", runningTimeDisplay);

    if (show) {
      const top5results = JSON.parse(localStorage.getItem("top5results"));
      if (!top5results) {
        setTop5([
          {
            time: parseFloat(runningTimeDisplay),
            animal: checkWhichAnimal(runningTimeDisplay),
          },
        ]);
        localStorage.setItem(
          "top5results",
          JSON.stringify([parseFloat(runningTimeDisplay)])
        );
      } else if (top5results.length < 5) {
        localStorage.setItem(
          "top5results",
          JSON.stringify([...top5results, parseFloat(runningTimeDisplay)])
        );
        const copy = [...top5results, parseFloat(runningTimeDisplay)];
        copy.sort();
        const newArr = copy.map((res) => {
          return {
            time: parseFloat(res),
            animal: checkWhichAnimal(res),
          };
        });

        setTop5([...newArr]);
      } else if (top5results.length >= 5) {
        top5results.push(parseFloat(runningTimeDisplay));
        top5results.sort();
        const copy = top5results.slice(0, 5);
        localStorage.setItem("top5results", JSON.stringify(copy));

        const sortedArray = [];
        for (let i = 0; i < 5; i++) {
          sortedArray.push({
            time: parseFloat(top5results[i]),
            animal: checkWhichAnimal(top5results[i]),
          });
        }
        setTop5(sortedArray);
      }
    }
  }, [show]);

  const checkWhichAnimal = (time) => {
    let animal;
    if (time <= 30) {
      animal = "chita";
    } else if (time <= 40) {
      animal = "gnu";
    } else if (time <= 50) {
      animal = "horse";
    } else if (time <= 65) {
      animal = "elephant";
    } else if (time <= 85) {
      animal = "sloth";
    } else {
      animal = "turtle";
    }
    return animal;
  };

  return (
    <Container show={show}>
      <List>
        <Title>Your Top 5 Scores:</Title>
        {top5.map((res) => (
          <ResultItem key={uuid_v4()}>
            <AnimalPicture
              src={require(`../../images/${res.animal}-logo.png`)}
            />
            <ResultTime>{res.time}</ResultTime>
          </ResultItem>
        ))}
      </List>
    </Container>
  );
};

export default TopScores;

const Container = styled.div`
  position: absolute;
  bottom: -100%;
  left: 0;
  height: 48vh;
  width: 99%;
  transition: all 1s ease-out;
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
  @media (max-width: ${SMALL_WIDTH_SCREEN}) {
    font-size: 2rem;
  }
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
