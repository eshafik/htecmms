import history from "../../history";

import * as actionTypes from "./type"
import backend from "../../api/backend";
import {notify_error, notify_success} from "../../components/Notify";

export const userLogin = formValues => async (dispatch, getState) => {
    try{
        const response = await backend.post('/users/token/', {...formValues});
        console.log("request: ", response.status);
        if (response.status === 200) {
            notify_success("Login Success!");
        }
        dispatch({type: actionTypes.LOG_IN, payload: response.data});
        history.push("/htecmms");
    }catch (e) {
        notify_error("Credential Mismatched...! Try Again..!")
    }
};

export const userLogOut = () => async (dispatch, getState) => {
    if (localStorage.getItem("token")){
        notify_success("Logged out successfully!")
    }
    dispatch({type: actionTypes.LOG_OUT});
};

