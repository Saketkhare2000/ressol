import React, { createContext, useState } from "react";

export const WebContext = createContext();

const WebProvider = (props) => {
  const [filter, setFilter] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [prime, setIsPrime] = useState(true);
  const value = {
    loggedIn,
    setLoggedIn,
    filter,
    setFilter,
    prime,
    setIsPrime,
  };

  return (
    <WebContext.Provider value={value}>{props.children}</WebContext.Provider>
  );
};

export default WebProvider;
