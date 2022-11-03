export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_DETAIL = "GET_DOGS_DETAIL";


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