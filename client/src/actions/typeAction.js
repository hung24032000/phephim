import TypeAPI from "../api/typeAPI";
import * as actionTypes from "./configActionType";
export const GET_ALL_TYPE = (types) => {
    return { type: actionTypes.GET_ALL_TYPE, payload: types };
};

export const GET_ALL_TYPE_REQUEST = (params) => {
    return (dispatch) => {
        try {
            return TypeAPI.getAll(params).then((response) => {
                dispatch(GET_ALL_TYPE(response.data.data));
            });
        } catch (error) {
            return dispatch(GET_ALL_TYPE());
        }
    };
};
