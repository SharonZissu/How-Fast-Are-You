import React, { useContext } from "react";
import styled from "styled-components";
import { TimerContext } from "../../timer-context";
import { BIG_WIDTH_SCREEN, SMALL_WIDTH_SCREEN } from "../../styles/variables";

const Buttons = ({
  findHelperIsClicked,
  handleFindHelperClicked,
  fiveSecHelperIsClicked,
  handleFiveSecHelperClicked,
  count,
  handleRestart,
}) => {
  const { runningTime } = useContext(TimerContext);
  return (
    <Container>
      <RestartBtn onClick={handleRestart}>Restart</RestartBtn>
      <FindBtn onClick={handleFindHelperClicked} helper={!findHelperIsClicked}>
        Find
      </FindBtn>
      <FiveSecBtn
        onClick={handleFiveSecHelperClicked}
        show={!fiveSecHelperIsClicked && runningTime <= 30000 && count > 25}
      >
        -5 Sec
      </FiveSecBtn>
    </Container>
  );
};

export default Buttons;

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    margin-left: 1rem;
    width: 50%;
  }
`;

const Btn = styled.button`
  border: none;
  padding: 0.6rem 2rem;
  margin-right: 1rem;
  font-size: 1.8rem;
  font-family: inherit;
  text-transform: uppercase;
  border-radius: 0.4rem;

  &:focus {
    outline: none;
  }
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    width: 27%;
    padding: 0.5rem 1rem;
    font-size: 2rem;
  }
`;

const RestartBtn = styled(Btn)`
  font-size: 2.2rem;
  background-color: #f26767;
  margin-right: 1rem;
  font-family: inherit;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    width: 35%;
    font-size: 2rem;
  }
`;

const FindBtn = styled(Btn)`
  background-color: ${({ helper }) => (helper ? "#686f87" : "#aca9a9")};
  text-decoration: ${({ helper }) => (helper ? "none" : "line-through")};
`;

const FiveSecBtn = styled(Btn)`
  margin: 0;
  background-color: ${({ show }) => (show ? "#438c4c" : "#aca9a9")};
  text-decoration: ${({ show }) => (show ? "none" : "line-through")};
`;
