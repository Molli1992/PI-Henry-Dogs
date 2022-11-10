import { GET_DOGS, GET_DOGS_DETAIL, GET_TEMPERAMENTS } from "../Actions/index";


const initialState = {
    dogs: [],
    dogsDetail: {},
    temperaments: []
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

    if (action.type === GET_TEMPERAMENTS) {
        return {
            ...state,
            temperaments: action.payload
        }
    };


};



export default rootReducer;