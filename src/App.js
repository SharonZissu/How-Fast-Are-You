import React, { useState, useRef, useEffect, useCallback } from "react";
import { BrowserRouter } from "react-dom";
import logo from "./logo.svg";
import "./App.css";
import Timer from "./Timer/Timer";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Button from "./Button/Button";
import { uuid } from "uuidv4";

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

  useEffect(() => {
    createBoard();
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

    const updateCells = [...cells];
    const numIndex = cells.findIndex((cell) => number == cell.number);

    //check the 2nd round which start from 26
    if (number > cells.length && count1 === number) {
      updateCells[numIndex].number = null;
      updateCells[numIndex].finish = true;
      setCells(updateCells);
      setCount1(number + 1);

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
      }
    }
  };

  const handleRestartClicked = () => {
    setBtnClicked(false);
    createBoard();
    setCount1(1);
  };

  return (
    <Container>
      <TextContainer>
        {/* <Title>How Fast Are You?</Title>
        <Paragraph>Try to click from 1 to 50 with the best time!</Paragraph> */}
        {/* {btnClicked && (
        <Timer btnClicked={btnClicked} handleClick={handleClick} />
      )} */}
        <Title>How Fast Are You?</Title>
      </TextContainer>
      <GameContainer>
        <Board>
          {cells.map((cell) => (
            <Button
              key={uuid()}
              cell={cell}
              clicked={() => handleClick(cell.number)}
            >
              {cell.number}
            </Button>
          ))}
        </Board>

        <Timer
          btnClicked={btnClicked}
          handleRestartClicked={handleRestartClicked}
          gameFinish={gameFinish}
        />
      </GameContainer>
      <GlobalStyle />
    </Container>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
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
  /* font-family: 'Courgette', cursive; */
  font-weight: 400;
  line-height: 1.6;
  color: black;
  
  /* height: 100vh; */
  text-align: center;

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
  height: 25vh;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
  @media (max-width: 600px) {
    height: 15vh;
  }
`;

const Paragraph = styled.p``;
const Title = styled.h1`
  font-size: 6rem;
  @media (max-width: 600px) {
    font-size: 4rem;
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
  @media (max-width: 600px) {
    height: 35vh;
    order: 1;
    margin-top: 5rem;
  }
  /* background-color: red; */
  /* margin: auto; */
  /* margin-bottom: 5rem; */
  vertical-align: middle;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
