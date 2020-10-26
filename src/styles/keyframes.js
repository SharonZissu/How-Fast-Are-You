import { keyframes } from "styled-components";

export const showFiveSec = keyframes` 
  0% {
    opacity: 0;
    /* box-shadow: none; */

  }
  50% {
    opacity: 1;
    transform: translateX(7rem);

  }
  100% {
    opacity: 0;
    transform: translateX(7rem);

  }
`;

export const flash = keyframes`
0% {
    opacity: 1;
}
100% {
    opacity: 0;
}
`;

export const pulsate = keyframes` 
  0% {
    transform: scale(1);
    box-shadow: none;

  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 1rem 4rem rgba(0, 0, 0, 0.25);
    background-color: #686f87;
    z-index: 5;
    border: 2px solid black;
  }
  100% {
    transform: scale(1);
    box-shadow: none;
  }
`;
