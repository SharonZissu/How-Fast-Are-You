import React, { createContext, useState } from "react";

const SidebarContext = createContext();
const { Provider } = SidebarContext;

const SidebarProvider = ({ children }) => {
  const [timesBarClicked, setTimesBarClicked] = useState(false);
  const [rulesBarClicked, setRulesBarClicked] = useState(false);

  const handleSidebarClicked = (name) => {
    if (name === "times") {
      setTimesBarClicked(!timesBarClicked);
      setRulesBarClicked(false);
    } else {
      setRulesBarClicked(!rulesBarClicked);
      setTimesBarClicked(false);
    }
  };

  const exitSiderBar = () => {
    setTimesBarClicked(false);
    setRulesBarClicked(false);
  };

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

export { SidebarContext, SidebarProvider };
