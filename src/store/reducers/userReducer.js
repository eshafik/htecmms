import _ from "lodash";
import * as actionTypes from '../actions/type';


const userReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS:
            console.log("fetch user reducer============");
            console.log("users============", {...state, ...action.payload});
            return {...state, ...action.payload}
        case actionTypes.FETCH_USER:
            return {...state, user: {...state.user, ...action.payload}}
        case actionTypes.CREATE_USER:
            // return {...state, [action.payload.id]: action.payload}
            return {...state, user: {...state.user, ...action.payload}}
        case actionTypes.EDIT_USER:
            return {...state, user: {...state.user, ...action.payload}}
        case actionTypes.BLOCK_UNBLOCK_USER:
            return state;
        case actionTypes.DELETE_STREAM:
            // return _.omit(state, action.payload)
            const result = _.omit(state.results, action.payload);
            return {...state, results: {...result}}
        case actionTypes.USER_GROUPS:
            const groups = {groups: action.payload}
            return {...state, ...groups}

        default:
            return state;
    }
};

export default userReducer;