import React from "react";
import styled from "styled-components";

const Buttons = ({
  findHelperIsClicked,
  handleFindHelperClicked,
  fiveSecHelperIsClicked,
  handleFiveSecHelperClicked,
  runningTime,
  count,
  handleRestart,
}) => {
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

const FiveSecBtn = styled(Btn)`
  margin: 0;
  background-color: ${({ show }) => (show ? "#438c4c" : "#aca9a9")};
  text-decoration: ${({ show }) => (show ? "none" : "line-through")};
`;
