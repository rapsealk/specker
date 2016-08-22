import { LAUNCH_PAGE_STATE, LAUNCH_LINK_STATE } from '../actions/types';

const INITIAL_STATE = { pageState:0, linkState:0 };


export default function(state = [], action){

    switch (action.type){
        case LAUNCH_PAGE_STATE:
            return {...state, pageState:action.payload};

        case LAUNCH_LINK_STATE:
            return {...state, linkState:action.payload};

        default:
            return state;
    }
}