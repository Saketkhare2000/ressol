import axios from "axios";
import { useContext } from "react";

//action creators
import { useSelector } from "react-redux";
import { WebContext } from "../Context/WebContext";

export const userAuth = (userDetails) => async (dispatch) => {
  //Fetch axios request
  const auth = await axios({
    method: "post",
    url: "http://localhost:8000/auth/login/",
    data: userDetails,
  });
  console.log(auth);
  //set access token
  dispatch({
    type: "LOGGED_IN",
    payload: {
      access: auth.data.access,
      refresh: auth.data.refresh,
    },
  });
};

export const getUserData = (userName, accessToken) => async (dispatch) => {
  //Fetch axios request
  const userData = await axios({
    method: "get",
    url: `http://localhost:8000/api/profile/${userName}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(userData.data);
  //set user data
  dispatch({
    type: "SET_USER_DATA",
    payload: userData.data,
  });
};
