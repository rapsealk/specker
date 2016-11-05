import {AUTH_USER,  AUTH_ERROR,UN_AUTH_USER, TAG_INCOMPLETE_USER, SIGN_UP_INCOMPLETE_USER} from '../actions/types';

const INITIAL_STATE = {authenticated: false, tagAuthenticated:false, isEmailing:false};
export default function(state = INITIAL_STATE, action) {
    console.log("hello!", action.type);
    switch(action.type) {
        case AUTH_USER:
            return { ...state, error: '',isEmailing:false, authenticated: true, tagAuthenticated:true };
        case TAG_INCOMPLETE_USER:
            return { ...state, error: '',isEmailing:false, authenticated: true, tagAuthenticated:false };
        case SIGN_UP_INCOMPLETE_USER:
            return { ...state, error: '', isEmailing:true, authenticated: false, tagAuthenticated:false};
        case UN_AUTH_USER:
            return { ...state, isEmailing:false, authenticated: false, tagAuthenticated:false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };

    }

    return state;
}
