import * as actionTypes from '../actions/type';

let isUserAuthenticated = !!localStorage.getItem("idToken");

const INITIAL_STATE = {
    isUserAuthenticated: isUserAuthenticated,
    idToken: localStorage.getItem("idToken"),
    refreshToken: localStorage.getItem("refreshToken"),
}

const firebaseAuthReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.USER_LOG_IN:
            return {...state,
                isUserAuthenticated: true,
                idToken: localStorage.getItem("idToken"),
                refreshToken: localStorage.getItem("refreshToken"),
            }
        case actionTypes.REFRESH_TOKEN:
            return {...state,
                isUserAuthenticated: true,
                idToken: action.payload.id_token,
                refreshToken: action.payload.refresh_token,
            }
        case actionTypes.USER_LOG_OUT:
            localStorage.removeItem('idToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('name');
            return {...state,
                isUserAuthenticated: false,
                idToken: null,
                refreshToken: null
            }
        default:
            return state;
    }
};

export default firebaseAuthReducer;