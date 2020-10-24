import React, { useState, useRef, useEffect, useCallback } from "react";
import { BrowserRouter } from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import Timer from "./Timer/Timer";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Button from "./Button/Button";
import { uuid } from "uuidv4";
import Modal from "./Modal/Modal";
import TimesBar from "./TimesBar/TimesBar";

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function App() {
  const [count1, setCount1] = useState(1);
  // const [count2, setCount2] = useState(1);
  const [cells, setCells] = useState([]);
  const [endCells, setEndingCells] = useState([]);
  const [btnClicked, setBtnClicked] = useState(false);
  const [gameFinish, setGameFinish] = useState(false);
  const [indexClicked, setIndexClicked] = useState();
  const [findHelperIsClicked, setFindHelperIsClicked] = useState(false);
  const [findHelperIndex, setFindHelperIndex] = useState(-1);
  let restart = useRef(null);

  useEffect(() => {
    createBoard();

    // return () => {
    //   clearTimeout(restart.current);
    // };
  }, []);

  const createBoard = () => {
    const startingCells = [];
    const endCells = [];
    //
    for (let i = 1; i < 26; i++) {
      startingCells.push({
        number: i,
        changed: false,
        finish: false,
      });
    }

    for (let i = 26; i < 51; i++) {
      endCells.push({
        number: i,
        changed: false,
        finish: false,
      });
    }
    console.log(endCells);
    shuffle(startingCells);
    shuffle(endCells);

    setCells(startingCells);
    setEndingCells(endCells);
  };

  const handleClick = (number) => {
    console.log("clicked");
    //check if the user start the game (when he clicked on 1)
    if (number === 1 && btnClicked === false) {
      setBtnClicked(true);
    }

    if (findHelperIndex !== -1 && number === cells[findHelperIndex].number) {
      setFindHelperIndex(-1);
    }

    const updateCells = [...cells];
    const numIndex = cells.findIndex((cell) => number == cell.number);

    //check the 2nd round which start from 26
    if (number > cells.length && count1 === number) {
      updateCells[numIndex].number = null;
      updateCells[numIndex].finish = true;
      setCells(updateCells);
      setCount1(number + 1);
      setIndexClicked(numIndex);

      //check if the user finish the game
      if (count1 === cells.length * 2) {
        setBtnClicked(false);
        setGameFinish(true);
        return;
      }
    } else {
      //check the 1st round which start from 1
      if (number === count1) {
        setCount1(number + 1);
        updateCells[numIndex].number = endCells[count1 - 1].number;
        updateCells[numIndex].changed = true;
        setCells(updateCells);
        setIndexClicked(numIndex);
      }
    }
  };

  const handleRestartClicked = () => {
    setBtnClicked(false);
    createBoard();
    setCount1(1);
    setFindHelperIsClicked(false);
    setFindHelperIndex(-1);
    setGameFinish(false);

    // restart.current = setTimeout(() => {
    //   setGameFinish(false);
    // }, 1000);
  };

  const handleFindHelperClicked = () => {
    if (findHelperIsClicked === false) {
      setFindHelperIsClicked(true);
      const findIndex = cells.findIndex((cell) => cell.number === count1);
      setFindHelperIndex(findIndex);
      console.log(findIndex);
    }
  };

  return (
    <Container>
      <TimesBar />
      <TextContainer>
        {/* <Title>How Fast Are You?</Title>
        <Paragraph>Try to click from 1 to 50 with the best time!</Paragraph> */}
        {/* {btnClicked && (
        <Timer btnClicked={btnClicked} handleClick={handleClick} />
      )} */}
        <Title>How Fast Are You?</Title>
        <SubTitle>Touching from 1 to 50 as fast as you can</SubTitle>
      </TextContainer>
      <GameContainer>
        <Board>
          {cells.map((cell, i) => (
            <Button
              key={uuid()}
              indexClicked={indexClicked}
              cell={cell}
              clicked={() => handleClick(cell.number)}
              count={count1}
              findHelperIsClicked={findHelperIsClicked}
              findHelperIndex={findHelperIndex}
            >
              {cell.number}
            </Button>
          ))}
        </Board>

        <Timer
          btnClicked={btnClicked}
          handleRestartClicked={handleRestartClicked}
          gameFinish={gameFinish}
          handleFindHelperClicked={handleFindHelperClicked}
          findHelperIsClicked={findHelperIsClicked}
          count={count1}
        />
      </GameContainer>
      <GlobalStyle />
    </Container>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap');
* {
  margin: 0;
  padding: 0;
}
*,
*::after,
*::before {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%; //1rem = 10px
  min-height: 100vh;
  
}

 

body {
  font-family: 'Syne Mono', monospace;
  /* font-family: 'Courgette', cursive; */
  /* font-weight: 100; */
  line-height: 1.6;
  color: black;
  
  /* height: 100vh; */
  /* text-align: center; */

}

`;

const Container = styled.div`
  /* height: 100vh; */
  width: 100vw;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  overflow: hidden;
  position: relative;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f68d69;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 6rem;
  @media (max-width: 600px) {
    font-size: 3.2rem;
  }
`;

const SubTitle = styled.p`
  @media (max-width: 600px) {
    font-size: 1.3rem;
    font-weight: 100;
  }
`;

const GameContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
    padding: 1rem;

    /* height: 70vh; */
  }
  /* justify-content: space-between; */
`;

const Board = styled.div`
  width: 50%;
  height: 75vh;
  /* opacity: 0; */
  @media (max-width: 600px) {
    height: 50vh;
    order: 1;
    /* margin-top: 2rem; */
  }
  /* background-color: red; */
  /* margin: auto; */
  /* margin-bottom: 5rem; */
  vertical-align: middle;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
