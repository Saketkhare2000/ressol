const initState = {
  userData: {
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    mobile: "",
    city: "",
    contacted_by: [],
    contacted_to: [],
    prime_status: [],
    properties: [],
    state: "",
    is_verified: false,
    country: "",
    user_type: "",
    wishlist: [],
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
    case "CLEAR_USER_DATA":
      return {
        ...state,
        userData: initState,
      };
    default:
      return state;
  }
};
export default userDataReducer;
