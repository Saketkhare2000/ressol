const initState = {
  userData: {
    username: "",
    email: "",
    mobile_number: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    password: "",
    access_token: "",
    refresh_token: "",
    is_prime: false,
  },
};

const userDataReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
export default userDataReducer;
