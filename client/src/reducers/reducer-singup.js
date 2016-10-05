import {SINE_UP_STATE} from '../actions/types';

const INITIAL_STATE = { step:0 };


export default function(state = [], action){

    switch (action.type){
        case SINE_UP_STATE:
            console.log('in reducer');
            return {...state, signup_step:action.payload};

        default:
            return state;
    }
}