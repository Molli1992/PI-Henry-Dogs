import { GET_DOGS, GET_DOGS_DETAIL } from "../Actions/index";


const initialState = {
    dogs: [],
    dogsDetail: {}
};


function rootReducer(state = initialState, action) {

    if (action.type === GET_DOGS) {
        return {
            ...state,
            dogs: action.payload,
        };
    };

    if (action.type === GET_DOGS_DETAIL) {
        return {
            ...state,
            dogsDetail: action.payload
        };
    };

    return state;

};



export default rootReducer;