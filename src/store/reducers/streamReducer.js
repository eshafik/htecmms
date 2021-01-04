import _ from "lodash";
import * as actionTypes from '../actions/type';

const INITIAL_STATE = {
    prev_link: null,
    next_link: null,
    results: {}
}


const streamReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STREAMS:
            // return {...state, ..._.mapKeys(action.payload, 'id')}
            return {...state, results: {...state.results, ..._.mapKeys(action.payload, 'id')}}
        case actionTypes.FETCH_STREAM:
            // return {...state, [action.payload.id]: action.payload}
            return {...state, results: {...state.results, [action.payload.id]: action.payload}}
        case actionTypes.CREATE_STREAM:
            // return {...state, [action.payload.id]: action.payload}
            return {...state, results:{...state.results, [action.payload.id]: action.payload}}
        case actionTypes.EDIT_STREAM:
            // const newState = {...state};
            // newState[action.payload.id] = action.payload;
            // return newState;
            // return {...state, [action.payload.id]: action.payload}
            return {...state, results:{...state.results, [action.payload.id]: action.payload}}
        case actionTypes.DELETE_STREAM:
            // return _.omit(state, action.payload)
            const result = _.omit(state.results, action.payload);
            return {...state, results: {...result}}
        default:
            return state;
    }
};

export default streamReducer;