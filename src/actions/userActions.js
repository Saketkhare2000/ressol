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

export const getUserData = (userName, key) => async (dispatch) => {
  //Fetch axios request
  const userData = await axios({
    method: "get",
    url: `http://localhost:8000/api/profile/${userName}/?expand=image,properties.image,wishlist.image`,
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });
  //set user data
  dispatch({
    type: "SET_USER_DATA",
    payload: userData.data,
  });
  return userData.data;
};


export const getPropertyList = (data) => async (dispatch) => {
  //Fetch axios request
  const propertyList = await axios({
    method: "get",
    url: `http://localhost:8000/api/filter`,
    params: data,
  });
  //set user data
  dispatch({
    type: "SET_PROPERTY_DATA",
    payload: propertyList.data,
  });

}


export const deleteImage = (id) => async (dispatch) => {
  const res = await axios.delete(
    `http://localhost:8000/api/image/${id}/`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return (res.data);
};

export const uploadImage = (image) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("name", image.name);
  formData.append("type", image.type);
  formData.append("size", image.size);

  const res = await axios.post(
    "http://localhost:8000/api/image/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return (res.data);
};

// export const getFeaturedProperties = (data) => async (dispatch) => {
//   const propertyList = await axios({
//     method: "get",
//     url: `http://localhost:8000/api/filter`,
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
