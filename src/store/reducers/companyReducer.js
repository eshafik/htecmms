import * as actionTypes from '../actions/type';

const companyReducer = (state={}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SECTIONS:
            return {...state, sections: action.payload}
        default:
            return state;
    }
};

export default companyReducer;