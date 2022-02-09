const initState = [];
const propertyListReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_PROPERTY_DATA":
            return {
                ...state,
                propertyData: action.payload,
            };
        case "CLEAR_PROPERTY_DATA":
            return {
                ...state,
                propertyData: initState,
            };
        default:
            return state;
    }
}
export default propertyListReducer;