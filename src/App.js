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
const startingNumbers = shuffle([
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
]);
const endingNumbers = shuffle([
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
]);
function App() {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(26);
  const [numbers, setNumbers] = useState(startingNumbers);
  const [btnClicked, setBtnClicked] = useState(false);

  const handleClick = (num) => {
    if (numbers.every((number) => number === null)) {
      setBtnClicked(false);
      console.log("Finish");

      return;
    }
    if (num === 1 && btnClicked === false) {
      setBtnClicked(true);
    }
    const numIndex = numbers.findIndex((number) => num == number);
    console.log(numIndex);
    const updateNumbers = [...numbers];
    if (num > numbers.length && count2 === num) {
      updateNumbers[numIndex] = null;
      setNumbers(updateNumbers);
      setCount2(num + 1);
      if (count2 === numbers.length * 2) {
        setBtnClicked(false);
      }
      return;
    } else {
      if (num === count1) {
        setCount1(num + 1);
        setCount2(num + 1);
        updateNumbers[numIndex] = endingNumbers.pop();
        setNumbers(updateNumbers);
      }
    }
  };

  return (
    <Container>
      <TextContainer>
        <Title>How Fast Are You?</Title>
        <Paragraph>Try to click from 1 to 50 with the best time!</Paragraph>
        {/* {btnClicked && (
        <Timer btnClicked={btnClicked} handleClick={handleClick} />
      )} */}
        <Timer btnClicked={btnClicked} handleClick={handleClick} />
      </TextContainer>
      <Board>
        {numbers.map((num) => (
          <Button key={uuid()} id={num} clicked={() => handleClick(num)}>
            {num}
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
  font-family: 'Courgette', cursive;
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
`;
