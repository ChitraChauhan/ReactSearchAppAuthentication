import { SET_CURRENT_PROFILE } from '../../actions/types';
import isEmpty from '../../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    profile: {},
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                profile: action.payload
            }
        default: 
            return state;
    }
}