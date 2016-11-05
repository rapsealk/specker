import { GET_CLASSIFICATION_TAG_DATA, SAVE_CLASSIFICATION_TAG_DATA } from '../actions/types';


const INITIAL_STATE = {tagData:[]};
export default function(state = INITIAL_STATE, action){
    console.log("hello11!", action.type);
    switch (action.type){
        case GET_CLASSIFICATION_TAG_DATA:
            return {...state, tagData:action.payload};
        case SAVE_CLASSIFICATION_TAG_DATA:
            return {...state};

        default:
            return state;
    }
}