import * as actionTypes from '../actions/type';

const INITIAL_STATE = {
    live_data: [],
    filtered_data: []
}

const machineStatusReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LIVE_STATUS:
            return {...state, live_data: action.payload}
        default:
            return state;
    }
};

export default machineStatusReducer;