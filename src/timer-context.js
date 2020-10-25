import React, { createContext, useState } from "react";

const TimerContext = createContext();
const { Provider } = TimerContext;

const TimerProvider = ({ children }) => {
  const [runningTime, setRunningTime] = useState(0);
  useEffect(() => {
    if (btnClicked) {
      //   console.log("here in if..");
      const startTime = Date.now();
      timer.current = setInterval(() => {
        // console.log(((Date.now() - startTime) / 1000).toFixed(2) / count);
        setRunningTime(Date.now() - startTime);
        // let average = ((Date.now() - startTime) / 1000).toFixed(2) / count;
        // console.log(average);
      }, 50);
    } else {
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
      // clearTimeout(restart.current);
    };
  }, [btnClicked]);

  useEffect(() => {
    if (btnClicked) {
      averageTimer.current = setInterval(() => {
        console.log("count", count);
        console.log("runningTime", runningTime);
        let checkAverage;
        if (fiveSecHelperIsClicked) {
          setAverage(((runningTime - 5000) / 1000).toFixed(2) / count);
          checkAverage = ((runningTime - 5000) / 1000).toFixed(2) / count;
        } else {
          setAverage((runningTime / 1000).toFixed(2) / count);
          checkAverage = (runningTime / 1000).toFixed(2) / count;
        }

        console.log("checkAverage:", checkAverage);
        let animalName;
        if (checkAverage <= 0.6) {
          animalName = "chita";
        } else if (checkAverage <= 0.8) {
          animalName = "gnu";
        } else if (checkAverage <= 1) {
          animalName = "horse";
        } else if (checkAverage <= 1.3) {
          animalName = "elephant";
        } else if (checkAverage <= 1.7) {
          animalName = "sloth";
        } else {
          animalName = "turtle";
        }
        setAnimalName(animalName);
      }, 50);
    }

    return () => {
      clearInterval(averageTimer.current);
    };
  }, [count, fiveSecHelperIsClicked]);
  return (
    <Provider
      value={{
        timesBarClicked,
        rulesBarClicked,
        handleSidebarClicked,
        exitSiderBar,
      }}
    >
      {children}
    </Provider>
  );
};

export { TimerContext, TimerContext };
