//create auth reducer
const initState = {
  loggedIn: false,
  key: "",

};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        loggedIn: true,
        key: action.payload.key,

      };
    case "LOGGED_OUT":
      return {
        ...state,
        loggedIn: false,

        key: "",
      };
    default:
      return state;
  }
};
export default authReducer;

