import * as actionTypes from '../actions/type';

const INITIAL_STATE = {
    live_data: [],
    filtered_data: [],
    onLoading: false
}

const machineStatusReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LIVE_STATUS:
            return {...state, live_data: action.payload}
        case actionTypes.FILTERED_DATA:
            return {...state, filtered_data: action.payload}
        case actionTypes.IS_FETCHING:
            return {...state, onLoading: true}
        case actionTypes.IS_FETCHED:
            return {...state, onLoading: false}
        default:
            return state;
    }
};

export default machineStatusReducer;