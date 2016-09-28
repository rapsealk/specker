import {AUTH_USER,  AUTH_ERROR,UN_AUTH_USER, TAG_INCOMPLETE_USER
} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, tagAuthenticated:true };
        case TAG_INCOMPLETE_USER:
            return { ...state, error: '', authenticated: true, tagAuthenticated:false };
        case UN_AUTH_USER:
            return { ...state, authenticated: false, tagAuthenticated:false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };

    }

    return state;
}
