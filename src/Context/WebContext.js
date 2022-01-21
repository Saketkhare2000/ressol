import React, { createContext, useState } from "react";

export const WebContext = createContext();

const WebProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const value = {
    loggedIn,
    setLoggedIn,
  };

  return (
    <WebContext.Provider value={value}>{props.children}</WebContext.Provider>
  );
};

export default WebProvider;
