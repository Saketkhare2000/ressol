import axios from "axios";
//action creators

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

export const userLogout = () => (dispatch) => {
  dispatch({
    type: "LOGGED_OUT",
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

// export const updateUserData =
//   (userDetails, accessToken) => async (dispatch) => {
//     //Fetch axios request
//     const userData = await axios({
//       method: "put",
//       url: `http://localhost:8000/api/profile/${userDetails.first_name}`,
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       data: userDetails,
//     });
//     console.log(userData.data);
//     //set user data
//     dispatch({
//       type: "UPDATE_USER_DATA",
//       payload: userData.data,
//     });
//   };
