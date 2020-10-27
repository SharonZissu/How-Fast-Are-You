import React, { createContext, useState, useRef, useEffect } from "react";

const TimerContext = createContext();
const { Provider } = TimerContext;

const TimerProvider = ({ children, gameStart }) => {
  const [runningTime, setRunningTime] = useState(0);
  let timer = useRef(null);

  useEffect(() => {
    //useEffect for the timer
    if (gameStart) {
      const startTime = Date.now();
      timer.current = setInterval(() => {
        setRunningTime(Date.now() - startTime);
      }, 50);
    } else {
      clearInterval(timer.current);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [gameStart]);

  return (
    <Provider
      value={{
        runningTime,
        timer,
        setRunningTime,
      }}
    >
      {children}
    </Provider>
  );
};

export { TimerContext, TimerProvider };
