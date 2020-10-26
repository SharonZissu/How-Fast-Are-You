import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";

//components
import Sidebar from "./Sidebar/Sidebar";
import Game from "./containers/Game/Game";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Container>
      <Sidebar type="times" />
      <Sidebar type="rules" />
      <Header />
      <Game />
      <GlobalStyle />
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100vw;
  overflow: hidden;
  position: relative;
`;
