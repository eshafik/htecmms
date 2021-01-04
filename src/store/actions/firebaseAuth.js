import history from "../../history";

import * as actionTypes from "./type"
import firebaseRefreshToken from "../../api/firebaseRefreshToken";
import {notify_success} from "../../components/Notify";

export const refreshToken = async () => {
    console.info("called refresh token method");
    if (!localStorage.getItem("refreshToken")){
        history.push("/phone-login");
    }else {
        const post_data = {grant_type: "refresh_token", "refresh_token": localStorage.getItem("refreshToken")};
        const response = await firebaseRefreshToken.post('', post_data);
        if (response.status === 200) {
            localStorage.setItem('refreshToken', response.data.refresh_token);
            localStorage.setItem('idToken', response.data.id_token);
        }
    }

};

export const userLoginWithPhone = () => (dispatch) => {
    console.log("Entered into login action")
    dispatch({type: actionTypes.USER_LOG_IN});
    notify_success("Login Success!");
    history.push("/")
};

export const userLogOutWithPhone = () => (dispatch) => {
    if (localStorage.getItem("idToken")){
        notify_success("Logged out successfully!");
    }
    dispatch({type: actionTypes.USER_LOG_OUT});
};

