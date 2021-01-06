import * as actionTypes from '../actions/type';

const companyReducer = (state={}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SECTIONS:
            return {...state, sections: action.payload}
        case actionTypes.FETCH_MACHINES:
            return {...state, machines: action.payload}
        default:
            return state;
    }
};

export default companyReducer;