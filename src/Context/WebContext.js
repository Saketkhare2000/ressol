import React, { createContext, useState } from "react";
import Alert from "../Components/Alert";

export const WebContext = createContext();

const WebProvider = (props) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
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
    alert,
    setAlert,
  };

  return (
    <WebContext.Provider value={value}>
      <Alert />
      {props.children}
    </WebContext.Provider>
  );
};

export default WebProvider;
