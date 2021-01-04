import _ from "lodash";
import * as actionTypes from '../actions/type';

let token;
let isAuthenticated;
if(localStorage.getItem("token")){
    token = localStorage.getItem("token");
    isAuthenticated = true;
}else {
    token = null;
    isAuthenticated = false;
}

const INITIAL_STATE = {
    isAuthenticated: isAuthenticated,
    token: token
}

const authReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            if(action.payload.token){
                localStorage.setItem('token', action.payload.token);
                return {isAuthenticated: true, token: action.payload.token}
            }
            localStorage.removeItem('token');
            return {isAuthenticated: false, token: null}
        case actionTypes.LOG_OUT:
            localStorage.removeItem('token');
            return {isAuthenticated: false, token: null}
        default:
            return state;
    }
};

export default authReducer;