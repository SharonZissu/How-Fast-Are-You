import { createGlobalStyle } from "styled-components";
import { BIG_WIDTH_SCREEN, SMALL_WIDTH_SCREEN } from "./variables";

export const GlobalStyle = createGlobalStyle`
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
  @media (max-width: ${SMALL_WIDTH_SCREEN}) {
    font-size: 50%;
  }
  @media (min-width: ${BIG_WIDTH_SCREEN}) {
    font-size: 80%;
  }
}

body {
  font-family: monospace;
  line-height: 1.6;
  color: black;
}


`;
