import {SIDE_BAR_STATE
} from '../actions/types';


const INITIAL_STATE = {sidebarState:false};
export default function(state = INITIAL_STATE, action ) {
    switch(action.type) {
        case SIDE_BAR_STATE:
            return { ...state, sidebarState:action.payload};
    }

    return state;
}
