import { GET_PROFILE_ERRORS } from '../../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_PROFILE_ERRORS:
            return action.payload;
        default: 
            return state;
    }
}