import axios from "axios";
import { useContext } from "react";
//action creators
import { WebContext } from "../Context/WebContext";
// export const userAuth = () => async (dispatch) => {
//   //Fetch axios request
//   // const auth = await axios({
//   //   method: "post",
//   //   url: "http://127.0.0.1:8000/auth/login/",
//   //   data: userDetails,
//   // });
//   // console.log(auth);
//   //set access token
//   dispatch({
//     type: "LOGGED_IN",
//     // payload: {
//     //   // access: auth.data.access,
//     //   // refresh: auth.data.refresh,
//     //   // key: auth.data.key,
//     // },
//   });
// };

// export const userLogout = () => (dispatch) => {
//   dispatch({
//     type: "LOGGED_OUT",
//   });
// };

export const getUserData = (phoneNumber, base_url) => async (dispatch) => {
  //Fetch axios request
  const userData = await axios({
    method: "get",
    url: `${base_url}api/profile/${phoneNumber}/?expand=image,properties.image,wishlist.image,prime_status`,
    // headers: {
    //   Authorization: `Bearer ${key}`,
    // },
  });
  //set user data
  dispatch({
    type: "SET_USER_DATA",
    payload: userData.data,
  });
  return userData.data;
};

export const getPropertyList = (data, base_url) => async (dispatch) => {
  //Fetch axios request
  const propertyList = await axios({
    method: "get",
    url: `${base_url}api/filter`,
    params: data,
  });
  //set user data
  dispatch({
    type: "SET_PROPERTY_DATA",
    payload: propertyList.data,
  });
};

export const deleteImage = (id, base_url) => async (dispatch) => {
  const res = await axios.delete(`${base_url}api/image/${id}/`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const uploadImage = (image, base_url) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("name", image.name);
  formData.append("type", image.type);
  formData.append("size", image.size);

  const res = await axios.post(`${base_url}api/image/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// export const getFeaturedProperties = (data) => async (dispatch) => {
//   const propertyList = await axios({
//     method: "get",
//     url: `${base_url}api/filter`,
//     params: data,
//   });
//   //set user data
//   dispatch({
//     type: "SET_PROPERTY_DATA",
//     payload: propertyList.data,
//   });
// }

// export const updateUserData =
//   (userDetails, accessToken) => async (dispatch) => {
//     //Fetch axios request
//     const userData = await axios({
//       method: "put",
//       url: `${base_url}api/profile/${userDetails.first_name}`,
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
