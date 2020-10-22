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

const startingNumbers = [];
const endingNumbers = [];
for (let i = 1; i < 26; i++) {
  startingNumbers.push({
    number: i,
    changed: false,
    finish: false,
  });
}
for (let i = 26; i < 51; i++) {
  endingNumbers.push({
    number: i,
    changed: false,
    finish: false,
  });
}

shuffle(startingNumbers);
shuffle(endingNumbers);

function App() {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(26);
  const [cells, setCells] = useState(startingNumbers);
  const [btnClicked, setBtnClicked] = useState(false);

  const handleClick = ({ number }) => {
    console.log(number);
    if (cells.every((cell) => cell.number === null)) {
      setBtnClicked(false);
      console.log("Finish");

      return;
    }
    if (number === 1 && btnClicked === false) {
      setBtnClicked(true);
    }
    const updateCells = [...cells];

    const numIndex = cells.findIndex((cell) => number == cell.number);
    // console.log("FINDNUM:", findNum);
    // const numIndex = findNum.index;
    console.log("numIndex:", numIndex);
    // console.log(updateCells[numIndex]);

    // console.log(numIndex);

    if (number > cells.length && count2 === number) {
      updateCells[numIndex].number = null;
      updateCells[numIndex].finish = true;

      setCells(updateCells);
      setCount2(number + 1);
      if (count2 === cells.length * 2) {
        setBtnClicked(false);
      }
      return;
    } else {
      if (number === count1) {
        setCount1(number + 1);
        setCount2(number + 1);
        updateCells[numIndex].number = endingNumbers.pop().number;
        updateCells[numIndex].changed = true;
        setCells(updateCells);
      }
    }
  };

  return (
    <Container>
      <TextContainer>
        {/* <Title>How Fast Are You?</Title>
        <Paragraph>Try to click from 1 to 50 with the best time!</Paragraph> */}
        {/* {btnClicked && (
        <Timer btnClicked={btnClicked} handleClick={handleClick} />
      )} */}
        <Timer btnClicked={btnClicked} handleClick={handleClick} />
      </TextContainer>
      <Board>
        {cells.map((cell) => (
          <Button key={uuid()} cell={cell} clicked={() => handleClick(cell)}>
            {cell.number}
          </Button>
        ))}
      </Board>
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
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Paragraph = styled.p``;
const Title = styled.h1`
  font-size: 6rem;
`;

const Board = styled.div`
  width: 50%;
  height: 60vh;
  /* background-color: red; */
  margin: auto;
  margin-bottom: 5rem;
  vertical-align: middle;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
