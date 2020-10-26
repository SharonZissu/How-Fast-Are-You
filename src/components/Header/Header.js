import React from "react";
import styled from "styled-components";

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
