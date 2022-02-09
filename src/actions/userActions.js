import axios from "axios";
//action creators

export const userAuth = (userDetails) => async (dispatch) => {
  //Fetch axios request
  const auth = await axios({
    method: "post",
    url: "http://127.0.0.1:8000/auth/login/",
    data: userDetails,
  });
  console.log(auth);
  //set access token
  dispatch({
    type: "LOGGED_IN",
    payload: {
      // access: auth.data.access,
      // refresh: auth.data.refresh,
      key: auth.data.key,
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
export const getPropertyList = (city) => async (dispatch) => {
  //Fetch axios request
  const propertyList = await axios({
    method: "get",
    url: `http://localhost:8000/api/filter`,
    params: {
      city: city,
    },
  });
  console.log(propertyList.data);
  // console.log(propertyList.data);
  //set user data
  dispatch({
    type: "SET_PROPERTY_DATA",
    payload: propertyList.data,
  });
}

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
