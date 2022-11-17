import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_DETAIL = "GET_DOGS_DETAIL";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";



export function getDogs() {
    return function (dispatch) {
        return fetch("http://localhost:3001/dogs")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_DOGS, payload: json });
            });
    };
};


export function getDogsDetail(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/dogs/${id}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_DOGS_DETAIL, payload: json });
            });
    };
};

export function getTemperaments() {
    return function (dispatch) {
        return fetch("http://localhost:3001/temperaments")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_TEMPERAMENTS, payload: json });
            });
    };
};
