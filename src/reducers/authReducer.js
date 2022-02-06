//create auth reducer
const initState = {
  loggedIn: false,
  accessToken: "",
  refreshToken: "",
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        loggedIn: true,
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh,
      };
    default:
      return state;
  }
};
export default authReducer;

// Reducer, action, dispatch
