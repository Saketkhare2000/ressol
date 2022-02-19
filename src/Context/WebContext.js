import React, { createContext, useState } from "react";
import Alert from "../Components/Alert";

export const WebContext = createContext();

const WebProvider = (props) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //access token state
  const [accessToken, setAccessToken] = useState("");
  //refresh token state
  const [refreshToken, setRefreshToken] = useState("");
  const [filter, setFilter] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [prime, setIsPrime] = useState(true);
  const [userData, setUserData] = useState();
  const [registerKey, setRegisterKey] = useState("");
  const [filterData, setFilterData] = useState();
  const [editPropertyId, setEditPropertyId] = useState("");
  const value = {
    loggedIn,
    setLoggedIn,
    filter,
    setFilter,
    prime,
    setIsPrime,
    alert,
    setAlert,
    userData,
    setUserData,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    userName,
    setUserName,
    registerKey,
    setRegisterKey,
    filterData,
    setFilterData,
    editPropertyId,
    setEditPropertyId,
    phoneNumber,
    setPhoneNumber,
  };

  return (
    <WebContext.Provider value={value} >
      <Alert />
      {props.children}
    </WebContext.Provider >
  );
};

export default WebProvider;
