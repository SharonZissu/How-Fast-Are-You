import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid_v4 } from "uuid";
import { shuffle } from "../../utills";
import { TimerProvider } from "../../timer-context";
import { BIG_WIDTH_SCREEN } from "../../styles/variables";

//components
import Timer from "../Timer/Timer";
import Cell from "../../components/Cell/Cell";

function Game() {
  //holding the state of the game

  const [count, setCount] = useState(1); //for the next number need to be clicked
  const [cells, setCells] = useState([]); // the cells of the board
  const [endCells, setEndingCells] = useState([]); //holds numbers 26-50
  const [gameStart, setGameStart] = useState(false);
  const [gameFinish, setGameFinish] = useState(false);
  const [indexClicked, setIndexClicked] = useState(); //holds the index of the cell that clicked (for design - changing the background-color of the cell)
  const [findHelperIsClicked, setFindHelperIsClicked] = useState(false);
  const [findHelperIndex, setFindHelperIndex] = useState(-1); //holds the index of the next cell need to be click (for design - the find helper)

  useEffect(() => {
    createBoard();
  }, []);

  const createAndShuffleCells = () => {
    const startingCells = [];
    for (let i = 1; i < 26; i++) {
      startingCells.push({
        number: i,
        changed: false,
        finish: false,
      });
    }
    shuffle(startingCells);
    return startingCells;
  };

  const createAndShuffleEndCells = () => {
    const endCells = [];
    for (let i = 26; i < 51; i++) {
      endCells.push({
        number: i,
        changed: false,
        finish: false,
      });
    }
    shuffle(endCells);
    return endCells;
  };

  const createBoard = () => {
    const startingCells = createAndShuffleCells();
    const endCells = createAndShuffleEndCells();
    setCells(startingCells);
    setEndingCells(endCells);
  };

  const copyCellsAndFindIndexOfNumberClicked = (number) => {
    const updateCells = [...cells];
    const numIndex = cells.findIndex((cell) => number == cell.number);
    return { updateCells, numIndex };
  };

  const checkIfGameStart = (number) => {
    if (number === 1 && gameStart === false) setGameStart(true); //check if the user start the game (when he clicked on 1)
  };

  const firstRoundCellClicked = (number) => {
    const { updateCells, numIndex } = copyCellsAndFindIndexOfNumberClicked(
      number
    );
    setCount(number + 1);
    updateCells[numIndex].number = endCells[count - 1].number; //change the current cell number with a number from the 2nd round
    updateCells[numIndex].changed = true; //mark that this cell has changed (for design - change to darker cell's background)
    setCells(updateCells);
    setIndexClicked(numIndex);
  };

  const secondRoundCellClicked = (number) => {
    const { updateCells, numIndex } = copyCellsAndFindIndexOfNumberClicked(
      number
    );
    setCount(number + 1);
    updateCells[numIndex].number = null; //change the current cell number to be empty
    updateCells[numIndex].finish = true; //mark that this cell has finished (for design - cell no background)
    setCells(updateCells);
    setIndexClicked(numIndex);
  };

  const checkIfGameFinish = () => {
    if (count === cells.length * 2) {
      setGameStart(false);
      setGameFinish(true);
      return true;
    }
  };

  const handleCellClicked = (number) => {
    checkIfGameStart(number);

    //check if the user clicked on the cell after he use the find helper (for design)
    if (findHelperIndex !== -1 && number === cells[findHelperIndex].number) {
      setFindHelperIndex(-1);
    }
    //check the 2nd round which start from 26
    if (number > cells.length && count === number) {
      secondRoundCellClicked(number);
      const checkWinning = checkIfGameFinish();
      if (checkWinning) return;
    } else {
      //check the 1st round which start from 1
      if (number === count) {
        firstRoundCellClicked(number);
      }
    }
  };

  const handleRestartBtnClicked = () => {
    setGameStart(false);
    setGameFinish(false);
    setCount(1);
    setFindHelperIsClicked(false);
    setFindHelperIndex(-1);
    createBoard();
  };

  const handleFindHelperClicked = () => {
    if (findHelperIsClicked === false) {
      const findIndex = cells.findIndex((cell) => cell.number === count);
      setFindHelperIndex(findIndex);
      setFindHelperIsClicked(true);
    }
  };

  //cells board
  const renderedCells = cells.map((cell, i) => (
    <Cell
      key={uuid_v4()}
      indexClicked={indexClicked}
      cell={cell}
      clicked={() => handleCellClicked(cell.number)}
      findHelperIndex={findHelperIndex}
    >
      {cell.number}
    </Cell>
  ));

  return (
    <GameContainer>
      <Board>{renderedCells}</Board>
      <TimerProvider gameStart={gameStart}>
        <Timer
          count={count}
          gameStart={gameStart}
          gameFinish={gameFinish}
          handleRestartBtnClicked={handleRestartBtnClicked}
          handleFindHelperClicked={handleFindHelperClicked}
          findHelperIsClicked={findHelperIsClicked}
        />
      </TimerProvider>
    </GameContainer>
  );
}

export default Game;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    /* flex-direction: row; */
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
`;

const Board = styled.div`
  height: 50vh;
  order: 1;
  width: 100%;

  vertical-align: middle;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    width: 45%;
    height: 42%;
    position: absolute;
    right: 1rem;
    bottom: 0.1rem;
    z-index: 800;
  }
`;
