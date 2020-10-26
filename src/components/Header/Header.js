import React from "react";
import styled from "styled-components";
import { BIG_WIDTH_SCREEN, SMALL_WIDTH_SCREEN } from "../../styles/variables";

const Header = () => {
  return (
    <Container>
      <Title>How Fast Are You?</Title>
      <SubTitle>Touching from 1 to 50 as fast as you can</SubTitle>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f68d69;
  padding: 2rem;
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3.2rem;

  @media (max-width: ${SMALL_WIDTH_SCREEN}) {
    font-size: 2.9rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 100;
`;
