import axios from "axios";

export const getUserData = (phoneNumber, base_url) => async (dispatch) => {
  //Fetch axios request
  const userData = await axios({
    method: "get",
    url: `${base_url}api/profile/${phoneNumber}/?expand=image,properties.image,wishlist.image,prime_status`,
    // url: `http://localhost:8000/api/profile/${phoneNumber}/?expand=image,properties.image,wishlist.image,prime_status`,
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
